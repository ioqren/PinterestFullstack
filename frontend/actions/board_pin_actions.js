import * as BPApiUtil from '../util/board_pin_util';

export const RECEIVE_PINS = 'RECEIVE_PINS';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';
export const RECEIVE_PIN = 'RECEIVE_PIN';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_PIN_BOARDS = 'RECEIVE_PIN_BOARDS';
export const RECEIVE_PIN_BOARD = 'RECEIVE_PIN_BOARD';
export const RECEIVE_BP_ERRORS = 'RECEIVE_BP_ERRORS';

const receivePins = pins => {
    return {
        type: RECEIVE_PINS,
        pins
    }
}
const receiveBoards = boards => {
    return {
        type: RECEIVE_BOARDS,
        boards
    }
}

const receivePin = pin => {
    return {
        type: RECEIVE_PIN,
        pin
    }
}

const receiveBoard = board => {
    
    return {
        type: RECEIVE_BOARD,
        board
    }
}

const receivePinBoards = pbs => {
    return {
        type: RECEIVE_PIN_BOARDS,
        pbs
    }
}

const receivePinBoard = pb => {
    return {
        type: RECEIVE_PIN_BOARD,
        pb
    }
}

const receiveBPErrors = errors => {
    return {
        type: RECEIVE_BP_ERRORS,
        errors: errors.responseText
    }
}

export const fetchPins = boardId => dispatch => {
    return BPApiUtil.fetchPins(boardId)
        .then(pins => dispatch(receivePins(pins)), errors => dispatch(receiveBPErrors(errors)))
}

export const fetchBoards = userId => dispatch => {
    
    return BPApiUtil.fetchBoards(userId)
        .then(boards => dispatch(receiveBoards(boards)), errors => dispatch(receiveBPErrors(errors)))
}

export const fetchPin = id => dispatch => {
    return BPApiUtil.fetchPin(id)
        .then(pin => dispatch(receivePin(pin)), errors => dispatch(receiveBPErrors(errors)))
}

export const fetchBoard = id => dispatch => {
    
    return BPApiUtil.fetchBoard(id)
        .then(board => dispatch(receiveBoard(board)), errors => dispatch(receiveBPErrors(errors)))
}

export const createPin = pin => dispatch => {
    return BPApiUtil.createPin(pin)
        .then(pin => dispatch(receivePin(pin)), errors => dispatch(receiveBPErrors(errors)))
}

export const createBoard = board => dispatch => {
    return BPApiUtil.createBoard(board)
        .then(board => dispatch(receiveBoard(board)), errors => dispatch(receiveBPErrors(errors)))
}

export const updatePin = pin => dispatch => {
    return BPApiUtil.updatePin(pin)
        .then(pin => dispatch(receivePin(pin)), errors => dispatch(receiveBPErrors(errors)))
}

export const updateBoard = board => dispatch => {
    return BPApiUtil.updateBoard(board)
        .then(board => dispatch(receiveBoard(board)), errors => dispatch(receiveBPErrors(errors)))
}

export const fetchPinBoards = () => dispatch => {
    return BPApiUtil.fetchPinBoards()
        .then(pbs => dispatch(receivePinBoards(pbs)), errors => dispatch(receiveBPErrors(errors)))
}