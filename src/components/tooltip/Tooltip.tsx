import './Tooltip.scss'

interface TooltipProps {
  title: string
}

function Tooltip({ title }: TooltipProps) {
  return (
    <div className="wrap-tooltip">
      <span className="title-tooltip">{title}</span>
    </div>
  )
}

export default Tooltip
