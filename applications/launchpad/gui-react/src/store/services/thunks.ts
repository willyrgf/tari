import { createAsyncThunk } from '@reduxjs/toolkit'
import { invoke } from '@tauri-apps/api/tauri'

import type { RootState } from '../'
import { selectServiceSettings } from '../settings/selectors'

import { Service, ServiceDescriptor } from './types'

export const start = createAsyncThunk<
  { service: Service; descriptor: ServiceDescriptor },
  Service,
  { state: RootState }
>('services/start', async (service, thunkAPI) => {
  try {
    const rootState = thunkAPI.getState()
    const settings = selectServiceSettings(rootState)

    const descriptor: ServiceDescriptor = await invoke('start_service', {
      serviceName: service.toString(),
      settings,
    })

    return {
      service,
      descriptor,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const stop = createAsyncThunk<void, Service>(
  'services/stop',
  async (service, thunkAPI) => {
    try {
      await invoke('stop_service', {
        serviceName: service.toString(),
      })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)