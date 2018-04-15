class Observer {

    constructor(){
        this.eventStore = {};
    }

    registerListener(eventType, callback){
        let event = this.eventStore[eventType] || [];

        event.push(callback);

        this.eventStore[eventType] = event;
    }

    removeListener(eventType, callback){
        let event = this.eventStore[eventType] || [];
        if(!event){
            return;
        }

        let index = event.indexOf(callback);

        if (index > -1) {
            event.splice(index, 1);
        }

        this.eventStore[eventType] = event;
    }

    dispatch(eventType, data){
        let event = this.eventStore[eventType];

        if(!event){
            return;
        }

        event.map((value) => {
            value(data);
        });
    }
}

const observer = new Observer();

export {observer};
export default observer;