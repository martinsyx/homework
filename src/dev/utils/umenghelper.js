import common from './common'
export default {
    IsUmengVer(){
        return typeof(MobclickAgent)!='undefined';
    },
    RegisterEvent(){
        this.CustomEvent('event','Register');
    },
    OrderEvent(){
        this.CustomEvent('event','Order');
    },
    CustomEvent(type,eventId,eventData){ 
        if(!common.isApp() || !this.IsUmengVer()){
            return;
        }
        switch(type){
            case 'event':
                MobclickAgent.onEvent(eventId);
                break;
            case 'label':
                MobclickAgent.onEventWithLabel(eventId,eventData);
                break;
            case 'params':
                MobclickAgent.onEventWithParameters(eventId, eventData);
                break;
            case 'counter':
                MobclickAgent.onEventWithCounter(eventId, eventData);
                break;
        }
    }
}