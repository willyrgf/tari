import LoadingIcon from '../../styles/Icons/Loading'

import { StyledSpan } from './styles'

/**
 * Loading
 * renders a spinning loading indicator
 *
 * @prop {boolean} loading - controls whether the indicator should be shown or not
 * @prop {string} [testId] - optional testId to assign for testing purposes
 */

const Loading = ({
  loading,
  size = '20px',
  testId,
}: {
  loading?: boolean
  size?: string
  testId?: string
}) =>
  loading ? (
    <StyledSpan data-testid={testId || 'loading-indicator'}>
      <LoadingIcon width={size} height={size} />
    </StyledSpan>
  ) : null

export default Loading
