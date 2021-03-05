import Vue from "vue";

const asyncCallMobile = Vue.observable({
    asyncCallResults: []
});

export const AsyncCallMobileInterface = {

    listenToFinishedAsyncCalls() {
        document.addEventListener('asyncCallfinished', function (e) {
            AsyncCallMobileInterface.updateResults(e.detail);
          }, false);
    },

    getAsyncCallResult(callId) {
        var asyncCallResult = asyncCallMobile.asyncCallResults.find(a => a.callId === callId);
       
        return asyncCallResult && asyncCallResult.result ? JSON.parse(asyncCallResult.result) : null;
    },
    clearAsyncCallResult (callId) {
        var index = asyncCallMobile.asyncCallResults.findIndex(a => { return a.callId === callId });
        if (index > -1)
            asyncCallMobile.asyncCallResults.splice(index, 1);
    },
    updateResults (asyncCallResult) {
        this.clearAsyncCallResult(asyncCallResult.callId);
        asyncCallMobile.asyncCallResults.push(asyncCallResult);
    }
};

