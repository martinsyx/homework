/*Uploader.open({ maximumImagesCount: 3 }, function (files) {
                img.setAttribute('src', files[0]);
                Uploader.getFormData(files, function (fd) {
                    fd.append('type', 'userface')
                    fd.append('orderProId', 'userface')

                    var url = "http://10.99.68.172:64563/1.0/FileUpload/Image/UploadOnlineReturnsImg"
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: fd,
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false
                    }).then(function (result) {
                        alert("result" + result);
                    }, function (error) {

                    });
                })
            })
*/
            
import $ from 'jquery';

export default class Uploader {
    static open(options, callback) {
        var defaults = {
            maximumImagesCount: 1,
            width: 800,
            height: 800,
            quality: 100
        };

        var opts = $.extend(defaults, options);
        window.imagePicker.getPictures(function (files) {
            if ($.isFunction(callback)) {
                callback(files)
            }
        }, function (error) {
            alert('Error: ' + error);
        }, opts);
    }

    static getFormData(files, callback) {
        var defs = [];
        var fd = new FormData();

        $(files).each(function (index, filePath) {
            var def = $.Deferred();

            window.resolveLocalFileSystemURL(filePath, function (fileEntry) {
                var ext = filePath.substring(filePath.lastIndexOf('.'));
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        var imgBlob = new Blob([e.target.result], { type: "image/jpeg" });
                        fd.append('file', imgBlob, new Date().getTime() + ext);
                        def.resolve();
                    };
                    reader.readAsArrayBuffer(file);
                }, function (e) {
                    console.log('error getting file', e);
                });
            }, function (e) {
                console.log('Error resolving fs url', e);
            });

            defs.push(def.promise());
        });

        $.when.apply($, defs).then(function () {
            if ($.isFunction(callback)) {
                callback(fd)
            }
        });
    }
    static getBase64(files, callback) {
        var defs = [];
        var fd = [];

        $(files).each(function (index, filePath) {
            var def = $.Deferred();

            window.resolveLocalFileSystemURL(filePath, function (fileEntry) {
                var ext = filePath.substring(filePath.lastIndexOf('.'));
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function (e) {
                        fd.push(e.target.result)
                        def.resolve();
                    };
                }, function (e) {
                    console.log('error getting file', e);
                });
            }, function (e) {
                console.log('Error resolving fs url', e);
            });

            defs.push(def.promise());
        });

        $.when.apply($, defs).then(function () {
            if ($.isFunction(callback)) {
                callback(fd)
            }
        });
    }
}