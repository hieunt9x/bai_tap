// JavaScript Document
var dbName = 'trac_nghiem';
var request = window.indexedDB.open(dbName, 1);
var db = null;

request.onsuccess = function( event ) {
  db = event.target.result;
}

request.onupgradeneeded = function (event) {
	db = event.target.result;
	 
	var objectCreateTopic = db.createObjectStore('topic_trac_nghiem', {keyPath: 'id'});
	objectCreateTopic.createIndex('name', 'name', {unique: false});
	
	var objectCreateAsk = db.createObjectStore('ask', {keyPath: 'id'});
	objectCreateAsk.createIndex('name', 'name', {unique: false});
	objectCreateAsk.createIndex('topic_trac_nghiem_id', 'topic_trac_nghiem_id', {unique: false});
	
	var objectCreateReply = db.createObjectStore('reply', {keyPath: 'id'});
	objectCreateReply.createIndex('name', 'name', {unique: false});
	objectCreateReply.createIndex('is_true', 'is_true', {unique: false});
	objectCreateReply.createIndex('ask_id', 'ask_id', {unique: false});
}

function get_list_topic() {
	var objectStore = db.transaction('topic_trac_nghiem', 'readwrite').objectStore('topic_trac_nghiem');
	
	var list_topic = objectStore.getAll();
	
	list_topic.onsuccess = function (e) {
		console.log(e.target.result);
		var data = e.target.result;
		
		if (data.length == 0) {
			$('.list-topic').html('<p>Không có topic</p>');
		} 
		
		for (var i = 0; i < data.length; i++) {
			$('.list-topic').append('<p><a href="" style="margin: 5px 10px;">'+ parseInt(i + 1) + ') ' + data[i].name + '</a> | <a onclick="delete_ask(\''+data[i].id + '\')" href="javascript:void(0)"> Xóa </a></p>');
		}
	}
}

function create_topic(data) {
	var id = makeId();
	var objectStore = db.transaction('topic_trac_nghiem', 'readwrite').objectStore('topic_trac_nghiem');

	var create = objectStore.add({
		id: id,
		name: data.name
	});
	
	return create;
}

function create_ask(data) {
	var id = makeId();
	var objectStore = db.transaction('ask', 'readwrite').objectStore('ask');

	var create = objectStore.add({
		id: id,
		name: data.name,
		topic_trac_nghiem_id: data.topic_trac_nghiem_id
	});
	
	return create;
}

function create_topic(data) {
	var id = makeId();
	var objectStore = db.transaction('topic_trac_nghiem', 'readwrite').objectStore('topic_trac_nghiem');

	var create = objectStore.add({
		id: id,
		name: data.name,
		topic_trac_nghiem_id: data.topic_trac_nghiem_id
	});
	
	return create;
}

function create_rep(data) {
	var objectStore = db.transaction('reply', 'readwrite').objectStore('reply');

	for (var i = 0; i < data.length; i++) {
		var create = objectStore.add(data[i]);
	}
	
	return;
}

function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function delete_ask(id) {
	console.log(id);
	var objectStore = db.transaction(["topic_trac_nghiem"], "readwrite").objectStore('topic_trac_nghiem');	
	var objectStoreRequest = objectStore.delete(id);
	
	objectStoreRequest.onsuccess = function(event) {
	  	window.location.reload();
	};
}