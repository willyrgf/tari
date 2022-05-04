import { useSelector } from 'react-redux'
import Switch from '../../components/Switch'

import Text from '../../components/Text'
import SvgSun from '../../styles/Icons/Sun'
import SvgMoon from '../../styles/Icons/Moon'

import MiningHeaderTip from './MiningHeaderTip'
import MiningViewActions from './MiningViewActions'

import { setTheme } from '../../store/app'
import { selectTheme } from '../../store/app/selectors'

import { NodesContainer } from './styles'
import MiningBoxTari from './MiningBoxTari'
import MiningBoxMerged from './MiningBoxMerged'
import { actions } from '../../store/wallet'
import { useAppDispatch } from '../../store/hooks'

/**
 * The Mining dashboard
 */
const MiningContainer = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useSelector(selectTheme)

  return (
    <div>
      <MiningHeaderTip />

      <NodesContainer>
        <MiningBoxTari />
        <MiningBoxMerged />
      </NodesContainer>

      <MiningViewActions />

      <button onClick={() => dispatch(actions.unlockWallet('pass'))}>
        Set pass
      </button>

      <button onClick={() => dispatch(actions.unlockWallet(''))}>
        Clear pass
      </button>

      <div style={{ marginTop: 80 }}>
        <button onClick={() => dispatch(setTheme('light'))}>
          Set light theme
        </button>
        <button onClick={() => dispatch(setTheme('dark'))}>
          Set dark theme
        </button>
        <div>
          <Text>Select theme</Text>
          <Switch
            leftLabel={<SvgSun width='1.4em' height='1.4em' />}
            rightLabel={<SvgMoon width='1.4em' height='1.4em' />}
            value={currentTheme === 'dark'}
            onClick={v => dispatch(setTheme(v ? 'dark' : 'light'))}
          />
        </div>
      </div>
    </div>
  )
}

export default MiningContainer