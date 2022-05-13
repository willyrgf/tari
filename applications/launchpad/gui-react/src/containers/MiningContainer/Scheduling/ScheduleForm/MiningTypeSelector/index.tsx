import { useTheme } from 'styled-components'

import { MiningNodeType } from '../../../../../types/general'
import Checkbox from '../../../../../components/Checkbox'
import t from '../../../../../locales'

const MiningTypeSelector = ({
  value,
  onChange,
}: {
  value: MiningNodeType[]
  onChange: (v: MiningNodeType[]) => void
}) => {
  const theme = useTheme()

  const toggle = (v: MiningNodeType) => {
    if (value.includes(v)) {
      onChange(value.filter(type => type !== v))

      return
    }

    onChange([...value, v])
  }

  return (
    <div>
      <Checkbox
        checked={value.includes('tari')}
        onChange={() => toggle('tari')}
        style={{ marginBottom: theme.spacing(0.75) }}
      >
        {t.common.miningType['tari']}
      </Checkbox>
      <Checkbox
        checked={value.includes('merged')}
        onChange={() => toggle('merged')}
      >
        {t.common.miningType['merged']}
      </Checkbox>
    </div>
  )
}
MiningTypeSelector.defaultProps = {
  value: [],
}

export default MiningTypeSelector
