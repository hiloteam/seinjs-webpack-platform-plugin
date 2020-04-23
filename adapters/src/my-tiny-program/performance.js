const performance = {}

// Date.now
if (!(Date.now && Date.prototype.getTime)) {
  Date.now = function now() {
    return new Date().getTime()
  }
}

function getServerTimeAsync() {
  return new Promise((resolve) => {
    try {
      my.getServerTime({
        success: (res) => {
          const { time } = res

          if (!time) {
            resolve(time)
          } else {
            resolve(Date.now())
          }
        },
        fail: () => {
          resolve(Date.now())
        },
      })
    } catch (e) {
      resolve(Date.now())
    }
  })
}

const startTime = Date.now()

performance.timing = {
  navigationStart: startTime,
}
performance.now = () => Date.now() - startTime

async function performanceAsync() {
  const startTime = await getServerTimeAsync()

  return {
    timing: {
      navigationStart: startTime,
    },
    now: async() => {
      const now = await getServerTimeAsync()

      return now - startTime
    },
  }
}

export {
  performance,
  performanceAsync,
}
