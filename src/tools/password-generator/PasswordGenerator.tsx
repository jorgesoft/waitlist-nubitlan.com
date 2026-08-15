import * as React from 'react'
import { CheckIcon, CopyIcon, RefreshCwIcon, ShieldIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WORDS } from './wordlist'
import {
  buildAlphabet,
  crackTimeLabel,
  generatePassphrase,
  generatePassword,
  passphraseEntropy,
  passwordEntropy,
  rateStrength,
  type PassphraseOptions,
  type PasswordOptions,
} from './generator'

const SEPARATORS = [
  { value: '-', label: 'guion' },
  { value: '.', label: 'punto' },
  { value: '_', label: 'guion bajo' },
  { value: ' ', label: 'espacio' },
]

function PasswordGenerator() {
  const [mode, setMode] = React.useState<'password' | 'passphrase'>('password')

  const [passwordOptions, setPasswordOptions] = React.useState<PasswordOptions>(
    {
      length: 20,
      lowercase: true,
      uppercase: true,
      digits: true,
      symbols: true,
      excludeAmbiguous: false,
    }
  )

  // 7 words rather than the usual diceware 5: this list holds ~640 words
  // (~9.3 bits each) instead of diceware's 7,776 (~12.9), so it takes more
  // words to clear the same entropy bar. 7 lands around 65 bits.
  const [passphraseOptions, setPassphraseOptions] =
    React.useState<PassphraseOptions>({
      wordCount: 7,
      separator: '-',
      capitalize: false,
      includeNumber: false,
    })

  const [value, setValue] = React.useState('')

  // At least one character class must stay on, or there is nothing to draw from.
  const alphabetEmpty = buildAlphabet(passwordOptions).length === 0

  const regenerate = React.useCallback(() => {
    setValue(
      mode === 'password'
        ? generatePassword(passwordOptions)
        : generatePassphrase(passphraseOptions)
    )
  }, [mode, passwordOptions, passphraseOptions])

  // Regenerate whenever the mode or any option changes, so the displayed
  // secret always matches the controls above it.
  React.useEffect(() => {
    regenerate()
  }, [regenerate])

  const bits =
    mode === 'password'
      ? passwordEntropy(passwordOptions)
      : passphraseEntropy(passphraseOptions)
  const strength = rateStrength(bits)

  return (
    <div className="space-y-6">
      {/* ===================== Output ===================== */}
      <Card className="border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]">
        <CardContent className="p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <Label className="eyebrow text-muted-foreground">
              Tu {mode === 'password' ? 'contraseña' : 'frase'}
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="iconSm"
                onClick={regenerate}
                aria-label="Generar de nuevo"
                title="Generar de nuevo"
              >
                <RefreshCwIcon className="size-4" />
              </Button>
              <CopyButton value={value} />
            </div>
          </div>

          <output
            className="bg-muted mt-3 block min-h-24 w-full rounded-lg p-4 font-mono text-lg leading-relaxed break-all select-all sm:text-xl"
            aria-live="polite"
            aria-atomic="true"
          >
            {alphabetEmpty && mode === 'password' ? (
              <span className="text-destructive text-base">
                Selecciona al menos un tipo de carácter.
              </span>
            ) : (
              value
            )}
          </output>

          <StrengthMeter bits={bits} strength={strength} />
        </CardContent>
      </Card>

      {/* ===================== Controls ===================== */}
      <Tabs
        value={mode}
        onValueChange={(next) => setMode(next as 'password' | 'passphrase')}
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="password">Contraseña</TabsTrigger>
          <TabsTrigger value="passphrase">Frase</TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <Card>
            <CardContent className="space-y-7 p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="length">Longitud</Label>
                  <span className="font-mono text-primary text-sm font-bold">
                    {passwordOptions.length}
                  </span>
                </div>
                <Slider
                  id="length"
                  className="mt-4"
                  min={6}
                  max={64}
                  step={1}
                  value={[passwordOptions.length]}
                  onValueChange={([length]) =>
                    setPasswordOptions((prev) => ({ ...prev, length }))
                  }
                  aria-label="Longitud de la contraseña"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <OptionSwitch
                  id="lowercase"
                  label="Minúsculas"
                  hint="a-z"
                  checked={passwordOptions.lowercase}
                  onChange={(lowercase) =>
                    setPasswordOptions((prev) => ({ ...prev, lowercase }))
                  }
                />
                <OptionSwitch
                  id="uppercase"
                  label="Mayúsculas"
                  hint="A-Z"
                  checked={passwordOptions.uppercase}
                  onChange={(uppercase) =>
                    setPasswordOptions((prev) => ({ ...prev, uppercase }))
                  }
                />
                <OptionSwitch
                  id="digits"
                  label="Números"
                  hint="0-9"
                  checked={passwordOptions.digits}
                  onChange={(digits) =>
                    setPasswordOptions((prev) => ({ ...prev, digits }))
                  }
                />
                <OptionSwitch
                  id="symbols"
                  label="Símbolos"
                  hint="!@#$%"
                  checked={passwordOptions.symbols}
                  onChange={(symbols) =>
                    setPasswordOptions((prev) => ({ ...prev, symbols }))
                  }
                />
              </div>

              <OptionSwitch
                id="ambiguous"
                label="Evitar caracteres confusos"
                hint="Quita l, I, 1, O, 0 y similares"
                checked={passwordOptions.excludeAmbiguous}
                onChange={(excludeAmbiguous) =>
                  setPasswordOptions((prev) => ({ ...prev, excludeAmbiguous }))
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passphrase">
          <Card>
            <CardContent className="space-y-7 p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="words">Número de palabras</Label>
                  <span className="font-mono text-primary text-sm font-bold">
                    {passphraseOptions.wordCount}
                  </span>
                </div>
                <Slider
                  id="words"
                  className="mt-4"
                  min={3}
                  max={12}
                  step={1}
                  value={[passphraseOptions.wordCount]}
                  onValueChange={([wordCount]) =>
                    setPassphraseOptions((prev) => ({ ...prev, wordCount }))
                  }
                  aria-label="Número de palabras"
                />
              </div>

              <fieldset>
                <legend className="text-sm font-medium">Separador</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SEPARATORS.map((separator) => (
                    <button
                      key={separator.value}
                      type="button"
                      onClick={() =>
                        setPassphraseOptions((prev) => ({
                          ...prev,
                          separator: separator.value,
                        }))
                      }
                      aria-pressed={
                        passphraseOptions.separator === separator.value
                      }
                      aria-label={separator.label}
                      className={cn(
                        'focus-visible:ring-ring/50 border-2 px-4 py-2 font-mono text-sm transition-all focus-visible:ring-[3px] focus-visible:outline-none',
                        passphraseOptions.separator === separator.value
                          ? 'border-sky-700 bg-primary text-primary-foreground dark:border-sky-200'
                          : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                      )}
                    >
                      {separator.value === ' ' ? '␣' : separator.value}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <OptionSwitch
                  id="capitalize"
                  label="Iniciales mayúsculas"
                  hint="Casa-Nube-Rio"
                  checked={passphraseOptions.capitalize}
                  onChange={(capitalize) =>
                    setPassphraseOptions((prev) => ({ ...prev, capitalize }))
                  }
                />
                <OptionSwitch
                  id="number"
                  label="Añadir un número"
                  hint="En una palabra al azar"
                  checked={passphraseOptions.includeNumber}
                  onChange={(includeNumber) =>
                    setPassphraseOptions((prev) => ({ ...prev, includeNumber }))
                  }
                />
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed">
                Las palabras se eligen al azar de una lista de{' '}
                <strong className="font-semibold">{WORDS.length}</strong>{' '}
                palabras en español sin acentos, para que la frase sea fácil de
                escribir en cualquier teclado.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PrivacyNote />
    </div>
  )
}

function StrengthMeter({
  bits,
  strength,
}: {
  bits: number
  strength: ReturnType<typeof rateStrength>
}) {
  const TONE = {
    destructive: 'bg-destructive',
    warning: 'bg-warning',
    success: 'bg-success',
  } as const

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={cn(
            'font-mono text-xs font-bold tracking-[0.1em] uppercase',
            strength.tone === 'destructive' && 'text-destructive',
            strength.tone === 'warning' && 'text-warning-foreground dark:text-warning',
            strength.tone === 'success' && 'text-success'
          )}
        >
          {strength.label}
        </span>
        <span className="text-muted-foreground font-mono text-xs">
          {Math.round(bits)} bits · {crackTimeLabel(bits)} para descifrar
        </span>
      </div>

      <div
        className="mt-2 flex gap-1.5"
        role="meter"
        aria-valuenow={strength.score}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label={`Fuerza: ${strength.label}, ${Math.round(bits)} bits de entropía`}
      >
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            className={cn(
              'h-2 flex-1 transition-colors duration-300',
              segment <= strength.score ? TONE[strength.tone] : 'bg-muted'
            )}
          />
        ))}
      </div>
    </div>
  )
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setFailed(false)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard is unavailable in insecure contexts and when the user has
      // denied permission. Tell them to copy by hand rather than failing mute.
      setFailed(true)
      setTimeout(() => setFailed(false), 3000)
    }
  }

  return (
    <Button
      variant="pixel"
      size="sm"
      onClick={copy}
      disabled={!value}
      aria-label="Copiar al portapapeles"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {failed ? 'Copia manual' : copied ? 'Copiado' : 'Copiar'}
    </Button>
  )
}

function OptionSwitch({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor={id} className="flex-col items-start gap-0.5">
        <span>{label}</span>
        {hint ? (
          <span className="text-muted-foreground font-mono text-xs font-normal">
            {hint}
          </span>
        ) : null}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  )
}

function PrivacyNote() {
  return (
    <div className="bg-sky-50 flex items-start gap-3 rounded-xl border border-sky-200 p-5 dark:border-sky-800 dark:bg-sky-950/50">
      <ShieldIcon className="text-primary mt-0.5 size-5 shrink-0" />
      <div>
        <h2 className="text-sm font-semibold">Se genera en tu navegador</h2>
        <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
          Las contraseñas se crean localmente con{' '}
          <code className="font-mono text-xs">crypto.getRandomValues</code>, el
          generador aleatorio del propio navegador. No se envían a ningún
          servidor, no se guardan y no quedan registradas en ninguna parte.
        </p>
      </div>
    </div>
  )
}

export default PasswordGenerator
