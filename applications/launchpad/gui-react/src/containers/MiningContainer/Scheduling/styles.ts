import styled from 'styled-components'

export const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-height: 100%;
`

export const NoSchedulesContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SchedulesListContainer = styled.div`
  outline: none;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 0 ${({ theme }) => theme.spacing()};
`
