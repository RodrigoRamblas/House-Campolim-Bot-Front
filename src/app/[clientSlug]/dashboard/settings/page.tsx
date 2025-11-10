'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import styles from './Settings.module.scss'
import { Rule, fetchRules, createRule, updateRule, deleteRule } from '@/services/rules'

const ACTION_OPTIONS = [
  { value: 'replace', label: 'Substituir (replace)' },
  { value: 'insert_after', label: 'Inserir após (insert_after)' },
  { value: 'insert_before', label: 'Inserir antes (insert_before)' },
  { value: 'to_h3', label: 'to_h3' },
  { value: 'to_h2', label: 'to_h2' },
  { value: 'to_h1', label: 'to_h1' },
  { value: 'replace_both', label: 'ReplaceBoth' },
  { value: 'replace_outside', label: 'ReplaceOutside' }
]

export default function SettingsPage() {
  const params = useParams()
  const router = useRouter()
  const clientSlug = useMemo(() => {
    if (typeof params.clientSlug === 'string') {
      return params.clientSlug
    }

    if (Array.isArray(params.clientSlug)) {
      return params.clientSlug[0]
    }

    return ''
  }, [params.clientSlug])

  const [rules, setRules] = useState<Rule[]>([])
  const [loadingRules, setLoadingRules] = useState(false)
  const [savingRule, setSavingRule] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [tag, setTag] = useState('')
  const [originalText, setOriginalText] = useState('')
  const [replacement, setReplacement] = useState('')
  const [action, setAction] = useState(ACTION_OPTIONS[0]?.value ?? 'replace')
  const [editingRuleId, setEditingRuleId] = useState<number | null>(null)
  const actionOptions = useMemo(() => {
    const knownOptions = new Map(ACTION_OPTIONS.map((option) => [option.value, option.label]))
    rules.forEach((rule) => {
      if (!knownOptions.has(rule.action)) {
        knownOptions.set(rule.action, rule.action)
      }
    })

    return Array.from(knownOptions, ([value, label]) => ({ value, label }))
  }, [rules])

  const loadRules = useCallback(async () => {
    setLoadingRules(true)
    setErrorMessage('')

    try {
  const list = await fetchRules({ skip: 0, limit: 100 })
      setRules(list)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar as regras.')
    } finally {
      setLoadingRules(false)
    }
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (!token) {
      router.push(`/${clientSlug}`)
      return
    }

    void loadRules()
  }, [clientSlug, loadRules, router])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!tag.trim() || !originalText.trim() || !replacement.trim() || !action.trim()) {
      setErrorMessage('Preencha todos os campos antes de salvar a regra.')
      return
    }

    setSavingRule(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const payload = {
        tag: tag.trim(),
        originalText: originalText.trim(),
        replacement: replacement.trim(),
        action: action.trim(),
      }

      if (editingRuleId !== null) {
        await updateRule(editingRuleId, payload)
        setSuccessMessage('Regra atualizada com sucesso.')
      } else {
        await createRule(payload)
        setSuccessMessage('Regra criada com sucesso.')
      }

      resetForm()
  await loadRules()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível salvar a regra.')
    } finally {
      setSavingRule(false)
    }
  }

  const handleEdit = (rule: Rule) => {
    setEditingRuleId(rule.id)
    setTag(rule.tag)
    setOriginalText(rule.original_text)
    setReplacement(rule.replacement)
    setAction(rule.action)
    setSuccessMessage('')
    setErrorMessage('')
  }

  const handleDelete = async (rule: Rule) => {
    const confirmation = window.confirm(`Deseja realmente remover a regra #${rule.id}?`)
    if (!confirmation) {
      return
    }

    setErrorMessage('')
    setSuccessMessage('')

    try {
      await deleteRule(rule.id)
      if (editingRuleId === rule.id) {
        resetForm()
      }
  await loadRules()
      setSuccessMessage('Regra removida com sucesso.')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível remover a regra.')
    }
  }

  const resetForm = () => {
    setEditingRuleId(null)
    setTag('')
    setOriginalText('')
    setReplacement('')
    setAction(ACTION_OPTIONS[0]?.value ?? 'replace')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Configurações do Proxy</h1>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => router.push(`/${clientSlug}/dashboard`)}
            >
              Voltar ao painel
            </button>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="tag">Tag HTML</label>
              <input
                id="tag"
                name="tag"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
                placeholder="Ex.: h1"
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="originalText">Texto original</label>
              <input
                id="originalText"
                name="originalText"
                value={originalText}
                onChange={(event) => setOriginalText(event.target.value)}
                placeholder="Ex.: Condomínio Fazenda Boa Vista"
                autoComplete="off"
              />
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="replacement">Texto de substituição</label>
              <input
                id="replacement"
                name="replacement"
                value={replacement}
                onChange={(event) => setReplacement(event.target.value)}
                placeholder="Ex.: 60 imóveis à venda ..."
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="action">Ação</label>
              <select
                id="action"
                name="action"
                value={action}
                onChange={(event) => setAction(event.target.value)}
              >
                {actionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={savingRule}
          >
            {savingRule ? 'Salvando...' : editingRuleId ? 'Atualizar regra' : 'Criar regra'}
          </button>

          {editingRuleId !== null && (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={resetForm}
            >
              Cancelar edição
            </button>
          )}
        </form>

        {errorMessage && (
          <p className={`${styles.feedback} ${styles.error}`}>
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className={`${styles.feedback} ${styles.success}`}>
            {successMessage}
          </p>
        )}

        <div className={styles.tableWrapper}>
          {loadingRules ? (
            <p className={styles.emptyState}>Carregando regras...</p>
          ) : rules.length === 0 ? (
            <p className={styles.emptyState}>Nenhuma regra cadastrada até o momento.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tag</th>
                  <th>Original</th>
                  <th>Substituição</th>
                  <th>Ação</th>
                  <th>Criada em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id}>
                    <td>{rule.id}</td>
                    <td>{rule.tag}</td>
                    <td>{rule.original_text}</td>
                    <td>{rule.replacement}</td>
                    <td>{rule.action}</td>
                    <td>{rule.created_at ? new Date(rule.created_at).toLocaleString() : '—'}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button
                          type="button"
                          className={styles.linkButton}
                          onClick={() => handleEdit(rule)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className={styles.linkButtonDanger}
                          onClick={() => handleDelete(rule)}
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
