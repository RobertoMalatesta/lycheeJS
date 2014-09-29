
lychee.define('game.net.Client').requires([
	'lychee.data.BitON',
	'game.net.client.Highscore'
]).includes([
	'lychee.net.Client'
]).exports(function(lychee, game, global, attachments) {

	var _BitON     = lychee.data.BitON;
	var _highscore = game.net.client.Highscore;


	var Class = function(settings, main) {

		lychee.net.Client.call(this, {
			encoder:   _BitON.encode,
			decoder:   _BitON.decode,
			reconnect: 10000
		});


		this.bind('connect', function() {

			this.addService(new _highscore(this));

			if (lychee.debug === true) {
				console.log('(Color) game.net.Client: Remote connected');
			}

		}, this);

		this.bind('disconnect', function(code, reason) {

			if (lychee.debug === true) {
				console.log('(Color) game.net.Client: Remote disconnected (' + code + ' | ' + reason + ')');
			}

		}, this);


		this.listen(settings.port, settings.host);

	};


	Class.prototype = {

	};


	return Class;

});

