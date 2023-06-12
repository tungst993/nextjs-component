import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

// import calendarSaga from 'domains/calendar/campaign-planner/saga';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
    yield all([
        // fork(calendarSaga),
    ]);
}
