import styled from 'styled-components'
import { animated } from 'react-spring'

export const PromptContainer = styled(animated.div)`
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 1;
  width: 476px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContentRow = styled(animated.div)`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const ContentContainer = styled(animated.div)`
  width: 417px;
  height: fit-content;
  margin-right: 30px;
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  /* hard-code required here */
  background-color: #20053d05;
  backdrop-filter: blur(9px);
  padding-bottom: 12px;
`

export const MessageContainer = styled(animated.div)`
  height: 468px;
  overflow-y: auto;
`

export const TBotContainer = styled(animated.div)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const StyledCloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 72px;
`

export const StyledCloseIcon = styled.div`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  margin-right: 27px;
`

export const StyledMessage = styled(animated.div)`
  max-width: 385px;
  height: fit-content;
  margin-left: ${({ theme }) => theme.spacingHorizontal(0.6)};
  margin-right: ${({ theme }) => theme.spacingHorizontal(0.6)};
  margin-bottom: ${({ theme }) => theme.spacingHorizontal(0.6)};
  background-color: ${({ theme }) => theme.background};
  opacity: 1;
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  box-shadow: ${({ theme }) => theme.shadow24};
  padding: 40px;
  color: ${({ theme }) => theme.primary};
  &:last-child {
    margin-bottom: 0;
  }
`

export const DotsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: ${({ theme }) => theme.spacingHorizontal(0.6)};
  margin-top: -30px;
  margin-bottom: -15px;
`
