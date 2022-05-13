import { useState } from 'react'

import Modal from '../../../components/Modal'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { selectSchedules, selectSchedule } from '../../../store/app/selectors'
import {
  toggleSchedule,
  removeSchedule,
  updateSchedule,
} from '../../../store/app'

import ScheduleList from './ScheduleList'
import ScheduleForm from './ScheduleForm'
import { ScheduleContainer } from './styles'

/**
 * @name SchedulingContainer
 * @description container component that renders scheduling info and allows to modify it
 *
 * @prop {boolean} open - indicates whether scheduling info should be rendered on screen
 * @prop {() => void} onClose - called to close scheduling info container
 */
const SchedulingContainer = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [idToEdit, setScheduleToEdit] = useState('')
  const [editOpen, setEditOpen] = useState(false)
  const schedules = useAppSelector(selectSchedules)
  const scheduleToEdit = useAppSelector(selectSchedule(idToEdit))
  const dispatch = useAppDispatch()

  const stopEditing = () => {
    setEditOpen(false)
    setScheduleToEdit('')
  }

  const editSchedule = (scheduleId: string) => {
    setScheduleToEdit(scheduleId)
    setEditOpen(true)
  }

  const addSchedule = () => {
    setScheduleToEdit('')
    setEditOpen(true)
  }

  const close = () => {
    stopEditing()
    onClose()
  }

  const removeScheduleBeingEdited = () => {
    dispatch(removeSchedule(idToEdit))
    stopEditing()
  }

  return (
    <Modal open={open} onClose={close} size='small'>
      <ScheduleContainer>
        {false && !editOpen && (
          <ScheduleList
            schedules={schedules}
            cancel={close}
            addSchedule={addSchedule}
            toggle={scheduleId => dispatch(toggleSchedule(scheduleId))}
            edit={editSchedule}
            remove={scheduleId => dispatch(removeSchedule(scheduleId))}
          />
        )}
        {(editOpen || true) && (
          <ScheduleForm
            value={scheduleToEdit}
            cancel={stopEditing}
            remove={removeScheduleBeingEdited}
            onChange={value => {
              dispatch(updateSchedule({ value, scheduleId: value.id }))
              stopEditing()
            }}
          />
        )}
      </ScheduleContainer>
    </Modal>
  )
}

export default SchedulingContainer
