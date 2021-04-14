const myLogger = store => next => action => {
    console.log(action);
    const result = next(action); //액션을 다음 미들웨어 전달, 없으면 리듀서에 전달

    console.log('\t',store.getState());

    return result;
};

export default myLogger;