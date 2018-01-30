import http from '../utils/http'
import config from 'config'
import common from '../utils/common'
import wxhelper from '../utils/wxhelper'
import store from '../store'
import $ from 'jquery';

function getDefalutParams(resolve, reject) {
    var defalut = {
        si: common.getUserToken(),
        ck: store.state.app.cartKey,
        regionId: store.state.app.regionId,
        pm: 8
    };

    defalut.pm=common.getPm();

    if (!defalut.si && !defalut.ck) {
        http.get(config.cartUrl + "/getInfo", { ck: 'hi' }).then(function (result) {
            if (result.Data.CartKey != '') {
                store.dispatch('setCartKey', result.Data.CartKey);
                defalut.ck = result.Data.CartKey;
            }
            resolve(defalut);
        });
    } else {
        resolve(defalut);
    }
};

export default {
    getInfo: function () {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                http.get(config.cartUrl + "/getInfo", params).then(function (result) {
                    if (result.Status == 1) {
                        if (result.Data.CartKey != "") {
                            store.dispatch('setCartKey', result.Data.CartKey);
                        }

                        if (result.Data.Qty >= 0) {
                            store.dispatch('updateCartNum', result.Data.Qty);
                        }
                        if(common.isWeixin()){
                            wxhelper.setEnableWxJsApiPay(result.Data.EnableWxPay)
                        }
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function (error) {
                    reject(error)
                });
            });
        })
    },
    getCart: function (params) {
        return new Promise(getDefalutParams).then(function (def) {
            return new Promise((resolve, reject) => {
                params = $.extend(def, params);

                http.get(config.cartUrl + "/getCart", params).then(function (result) {
                    if (result.Status == 1) {
                        if (result.Data.CartKey != "") {
                            store.dispatch('setCartKey', result.Data.CartKey);
                        }

                        if (result.Data.TotalQuantity >= 0 && params.displayMode != 1) {
                            store.dispatch('updateCartNum', result.Data.TotalQuantity);
                        }

                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    addItem: function (skuId, qty) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.skuId = skuId;
                params.qty = qty;
                params.retData = true;

                var newParams = common.fillTraceData(params);
                http.get(config.cartUrl + "/addItem", newParams).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }

                    store.dispatch('updateCartNum', result.Data.Qty);
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    addGift: function (pro, giftIds) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.proId = pro.PromotionId;
                params.giftIds = giftIds;

                http.post(config.cartUrl + "/addgift", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    addDirectGift: function (pro, giftIds) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.proId = pro.ChildPromotionId;
                params.giftIds = giftIds;

                http.post(config.cartUrl + "/AddDirectGift", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    updateQty: function (item, action) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                if (action == "+") {
                    if (item.Quantity < 299)
                        item.Quantity += 1;
                    else
                        item.Quantity = 299;
                } else {
                    if (item.Quantity > 1) {
                        item.Quantity -= 1;
                    } else {
                        item.Quantity = 1;
                    }
                }

                params.objId = item.ObjId;
                params.qty = item.Quantity;

                if (window.up_qty) {
                    clearTimeout(window.up_qty);
                }

                window.up_qty = setTimeout(function () {
                    http.get(config.cartUrl + "/updateQty", params).then(function (result) {
                        if (result.Status == 1) {
                            resolve(result);
                        } else {
                            reject(result.Msg);
                        }
                    }, function () {
                        reject("网络异常");
                    });
                }, 300);
            });
        });
    },
    removeItem: function (item) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.objId = item.ObjId;

                http.get(config.cartUrl + "/removeItem", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    removeSelected: function () {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                http.get(config.cartUrl + "/removeSelected", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    selectItem: function (item) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.objId = item.ObjId;
                params.check = item.Checked;

                http.get(config.cartUrl + "/selectItem", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    selectItemgf: function (promotion) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.objId = promotion.PromotionId;
                params.check = promotion.Gifts[0].Checked;
                params.type = promotion.Type;
                http.get(config.cartUrl + "/selectItem", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    selectAll: function (check) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.check = check;

                http.get(config.cartUrl + "/selectAll", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    resetStockOut: function () {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                http.get(config.cartUrl + "/resetStockOut", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    getReceiveGifts: function (pro) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.proId = pro.PromotionId;
                params.ruleId = pro.CurrRuleId;

                http.get(config.cartUrl + "/receiveGift", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    getDirectPromotionGift: function (pro) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.proId = pro.ChildPromotionId;
                params.ruleId = pro.CurrRuleId;

                http.get(config.cartUrl + "/DirectPromotionGift", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    getAttrData: function (item) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.itemId = item.ItemId;

                http.get(config.cartUrl + "/getGroupAttrData", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    changeAttr: function (objId, skuId) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.objId = objId;
                params.targetItemId = skuId;

                http.get(config.cartUrl + "/changeItem", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    removeGiftBag: function (pro) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.proId = pro.PromotionId;

                http.get(config.cartUrl + "/removeGiftBag", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    updateGiftBagQty: function (pro, action) {
        if (action == "+") {
            pro.GiftBagQty += 1;
        } else {
            if (pro.GiftBagQty > 1) {
                pro.GiftBagQty -= 1;
            } else {
                return false;
            }
        }
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.proId = pro.PromotionId;
                params.qty = pro.GiftBagQty;

                http.get(config.cartUrl + "/updateGiftBagQty", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        pro.GiftBagQty -= 1;
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    useGiftCode: function (code) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.giftCode = code;

                http.get(config.cartUrl + "/useGiftCode", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject({ msg: result.Msg, type: result.Data });
                    }
                }, function () {
                    reject({ msg: "网络异常", type: -1 });
                });
            });
        });
    },
    getReceiveCodeGifts: function (pro) {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                params.proId = pro.PromotionId;

                http.get(config.cartUrl + "/ReceiveCodeGift", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    merage: function () {
        return new Promise(getDefalutParams).then(function (params) {
            return new Promise((resolve, reject) => {
                http.get(config.cartUrl + "/merage", params).then(function (result) {
                    if (result.Status == 1) {
                        resolve(result);
                    } else {
                        reject(result.Msg);
                    }
                }, function () {
                    reject("网络异常");
                });
            });
        });
    },
    getCoupons: function (si) {
        return new Promise((resolve, reject) => {
            var params = { si: si };
            http.get(config.cartUrl + "/getCoupons", params).then(function (result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Msg);
                }
            }, function () {
                reject("网络异常");
            });
        });
    },
    useCoupon: function (params) {
        return new Promise((resolve, reject) => {
            http.get(config.cartUrl + "/useCouponCode", params).then(function (result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Msg);
                }
            }, function () {
                reject("网络异常");
            });
        });
    },
    useIntegral: function (params) {
        return new Promise((resolve, reject) => {
            http.get(config.cartUrl + "/useIntegral", params).then(function (result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Msg);
                }
            }, function () {
                reject("网络异常");
            });
        });
    },
    freeShipping: function (regionId, itemId, qty) {
        return new Promise((resolve, reject) => {
            let url = common.getApiBaseUrl() + "/freeShipping";
            var data = {
                regionId: regionId,
                infoId: itemId,
                quantity: qty,
            };
            http.get(url, data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    checkout: function (params) {
        var newParams = common.fillTraceData(params);
        return new Promise((resolve, reject) => {
            http.post(config.cartUrl + "/checkout", newParams).then(function (result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Msg);
                }
            }, function () {
                reject("网络异常");
            });
        });
    },
    getPayWays: function () {
        var pm=common.getPm();
        return new Promise((resolve, reject) => {
            http.get(config.cartUrl + "/GetPayWays", {si:common.getUserToken(),pm:pm}).then(function (result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Msg);
                }
            }, function () {
                reject("网络异常");
            });
        });
    },
    getRecommendProducts: function (itemId) {
        return new Promise((resolve, reject) => {
            http.get(common.getAppBaseUrl() + "/Items/AllRecommendProducts").then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getMpPayData: function (orderCode) {//openid未取到
        return new Promise((resolve, reject) => {
            let url = common.getApiBaseUrl() + "/shoppingcarts/MpPayData?si=" + common.getUserToken() + '&orderCode=' + orderCode
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    }
}