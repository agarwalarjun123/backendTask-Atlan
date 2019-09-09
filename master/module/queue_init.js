const queue = require('bull')

module.exports = {
    start_queue:new queue('start'),
    stop_queue:new queue('stop'),
    pause_queue:new queue('pause')
}
