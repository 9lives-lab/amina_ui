import axios from 'axios'

const rpcAddress = 'http://localhost:8090/'
const eventsApiAddress = 'ws://localhost:8090/api/events'

const eventHandlers = {}
const eventsApiConnection = new WebSocket(eventsApiAddress)
eventsApiConnection.onmessage = function (event) {
  const message = JSON.parse(event.data)
  const { key, data } = message

  if (key in eventHandlers) {
    const handlers = eventHandlers[key]
    for (const owner in handlers) {
      const handler = handlers[owner]
      handler(data)
    }
  }
}

export default {
  async sendEvent (key, data) {
    try {
      const url = `${rpcAddress}api/send_event_from_ui?key=${key}`
      await axios.post(url, data)
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  setEventHandler (key, owner, handler) {
    if (!(key in eventHandlers)) {
      eventHandlers[key] = {}
    }
    eventHandlers[key][owner] = handler
  },

  removeEventHandler (key, owner) {
    if (key in eventHandlers) {
      delete eventHandlers[key][owner]
    }
  },

  async sendRequest (key, inputValue = { value: 0 }) {
    try {
      const url = `${rpcAddress}api/rpc_call?key=${key}`
      const response = await axios.post(url, inputValue)
      if (response.data === null) {
        return
      }

      if (typeof response.data === 'object') {
        if ('Ok' in response.data) {
          return response.data.Ok
        } else if ('Err' in response.data) {
          throw response.data.Err
        } else {
          return response.data
        }
      } else {
        return response.data
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  getFileUrl (keyPath) {
    return `${rpcAddress}get_file/${keyPath}`
  },

  handleCmd (name, args) {
    const intArgs = {}
    const boolArgs = {}
    const stringArgs = {}

    for (const key in args) {
      const value = args[key]
      if (typeof (value) === 'string') {
        stringArgs[key] = value
      } else if (typeof (value) === 'number') {
        intArgs[key] = value
      } else if (typeof (value) === 'boolean') {
        boolArgs[key] = value
      }
    }

    const callArgs = {
      cmd_name: name,
      args: {
        u64_list: intArgs,
        bool_list: boolArgs,
        string_list: stringArgs
      }
    }

    this.sendRequest('amina.cmd_manager.handle', callArgs)
  }
}
