import { Machine } from 'xstate';

/**
 * This XState machine represents the mode of the thermostat.
 */
export const modeMachine = Machine({
    id: 'mode',
    initial: 'off',
    context: {
      retries: 0
    },
    states: {
      off: {
        on: {
          TEMP_TOO_HIGH: 'cooling',
          TEMP_TOO_LOW: 'heating'
        }
      },
      cooling: {
        on: {
          TEMP_NORMALIZED: 'off'
        }
      },
      heating: {
        on: {
          TEMP_NORMALIZED: 'off'
        }
      }
    }
});

export default modeMachine;
