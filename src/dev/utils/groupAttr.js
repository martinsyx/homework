
import $ from 'jquery';

function grepPV(key) {
    if (!key) {
        return [];
    }
    return $.grep(key.split(';'), function(n) {
        return n;
    });
}

function genSelStat(attrs, pid, vid, pIdx, baseProps) {
    var prop,
        pvArr = [],
        pvMapObj = attrs.pvMap,
        tmpVid,
        tmpKey,
        vIdx,
        imgPrev;

    pIdx = pIdx || 0;
    imgPrev = pIdx === 0;

    for (var ip = 0, tp = attrs.props.length; ip < tp; ip++) {
        prop = attrs.props[ip];

        if (ip === pIdx) {
            tmpVid = vid;
        } else {
            vIdx = -1;
            if (baseProps && baseProps[ip]) {
                tmpKey = ';' + pvArr.join(';') + ';' + prop.pid + ':';
                $.each(baseProps[ip].vals, function(ii, val) {
                    if ((ip === tp - 1 && attrs.skus[tmpKey + prop.vals[ii].vid + ';']) ||
                        (ip < tp - 1 && pvMapObj[prop.pid + ':' + prop.vals[ii].vid])) {
                        if (vIdx === -1) {
                            vIdx = ii;
                        }
                        if (val.stat && val.stat.sel) {
                            vIdx = ii;
                            return false;
                        }
                    }
                });
                if (vIdx == -1) {
                    vIdx = 0;
                }
            } else {
                vIdx = 0;
            }
            tmpVid = prop.vals[vIdx].vid;
        }

        if (!imgPrev && ip >= pIdx && prop.imgPrev) {
            imgPrev = true;
        }

        pvArr.push(prop.pid + ':' + tmpVid);

        if (ip < tp - 1 && pvMapObj[prop.pid + ':' + tmpVid]) {
            pvMapObj = pvMapObj[prop.pid + ':' + tmpVid];
        }
    }

    return {
        key: ';' + pvArr.join(';') + ';',
        imgPrev: imgPrev,
        descF5: attrs.props[pIdx].descF5
    };
}

function calPropStat(attrs, selKey) {
    var propStat = $.extend(true, [], attrs.props),
        selPvPairs = grepPV(selKey);

    for (var key in attrs.skus) {
        var sku = attrs.skus[key]        
        if(sku==null || sku.vIdx==null)
            continue;
        var vIdx = sku.vIdx,
            pvPairs = grepPV(key),
            vals, stat;
            
        for (var ipv = 0, tpv = pvPairs.length; ipv < tpv; ipv++) {
            vals = propStat[ipv].vals[vIdx[ipv]];
            if (ipv > 0 && pvPairs[ipv - 1] !== selPvPairs[ipv - 1]) {
                break;
            }

            var pvArr = pvPairs[ipv].split(':');
            if (!pvArr || pvArr.length != 2) {
                continue;
            }

            stat = {};

            if (pvPairs[ipv] === selPvPairs[ipv]) {
                stat.sel = 1;
            }

            if (ipv === tpv - 1) {
                stat.empty = true;
                if (sku.sale == 3) {
                    stat.cls = 'so';
                } else if (sku.sale == 2) {
                    stat.cls = 'oos';
                } else {
                    stat.empty = false;
                }
                stat.sale = sku.sale;
                vals.infoId = sku.infoId;
            }

            if(propStat[ipv].pname=='颜色' && sku.colorImg){
                vals.colorImg = sku.colorImg;
            }
            vals.stat = stat;
        }
    }
    var filterProps=[];
    propStat.forEach(item=>{
        item.vals.forEach(item2=>{
            if(item2.stat!=null && filterProps.indexOf(item)==-1){
                filterProps.push(item);
            }
        })
    })
    return filterProps;
}

export default {
    getProps(attrs, sel) {
        return calPropStat(attrs,sel);
    },
    genSelStat(attrs, pid, vid, pIdx, baseProps){
        return genSelStat(attrs, pid, vid, pIdx, baseProps);
    }
}