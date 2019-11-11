const mutations = {
  setRuleMutation (state, data) {
    state.selectRuleList = data
  },
  clearRuleMutation: state => {
    state.selectRuleList = {}
  },

  setRecordMutation (state, data) {
    state.selectRecordList = data
  },
  clearRecordMutation: state => {
    state.selectRecordList = []
  },

  setCustomRecord (state, data) {
    state.customRecordList = data
  },
  clearCustomRecord: state => {
    state.customRecordList = []
  }
}

export default mutations
