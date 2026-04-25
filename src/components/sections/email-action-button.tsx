import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export interface EmailActionButtonProps {
  label: string
  hasCopied: boolean
  onCopy: () => void
}

export function EmailActionButton({
  label,
  hasCopied,
  onCopy,
}: EmailActionButtonProps) {
  return (
    <button
      type="button"
      className="badge-action badge-email-action"
      data-copied={hasCopied}
      onClick={onCopy}
    >
      <span>{label}</span>
      <span className="badge-action-icon" aria-hidden="true">
        <HugeiconsIcon
          key={hasCopied ? "copied" : "copy"}
          icon={hasCopied ? Tick02Icon : Copy01Icon}
          size={16}
          strokeWidth={2}
        />
      </span>
    </button>
  )
}
