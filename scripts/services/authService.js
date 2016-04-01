angular.module('dashyAngular').factory('AuthEG', function( $state, $crypto) {
	return{
		setPassport: function(data) {
			var usrtoken = $crypto.encrypt(data.tokenApi);
			var usrid = $crypto.encrypt(data.iduser, data.tokenApi);
			var usrname = $crypto.encrypt(data.nombre, data.tokenApi);
			var usrmail = $crypto.encrypt(data.correo, data.tokenApi);
			var usrstatus = $crypto.encrypt(data.status, data.tokenApi);
			var usrsex = $crypto.encrypt(data.sex, data.tokenApi);
			var unixTimestamp = Date.now().toString();
			var usrtimelogin = $crypto.encrypt(unixTimestamp, data.tokenApi);
			var ArrayKEG = [usrtoken, usrid, usrname, usrmail, usrstatus, usrtimelogin,usrsex];
			localStorage.setItem("KEG", ArrayKEG);
			return true;
		},
		CheckPassport:function(){
			
			if(localStorage['KEG']=== undefined||localStorage['KEG']=== null){
				$state.go('login');
			}else{
				var storedData = localStorage.getItem('KEG');
				if (storedData) {
					var keyuncrypt = storedData.split(",");
					
					var usrtoken = $crypto.decrypt(keyuncrypt[0]);
					var usrid = $crypto.decrypt(keyuncrypt[1], usrtoken);
					var usrname = $crypto.decrypt(keyuncrypt[2], usrtoken);
					var usrmail = $crypto.decrypt(keyuncrypt[3], usrtoken);
					var usrstatus = $crypto.decrypt(keyuncrypt[4], usrtoken);
					var unixTimestampNow = Date.now().toString();
					var usrtimelogin = $crypto.decrypt(keyuncrypt[5], usrtoken);
					var usrsex = $crypto.decrypt(keyuncrypt[6], usrtoken);
					if((parseInt(unixTimestampNow)-parseInt(usrtimelogin))>3600000){
						localStorage.removeItem('KEG');
						$state.go('login');
					}
				} 
			}
		},
		GetUser:function(){
			var storedData = localStorage.getItem('KEG');
			if (storedData) {
				var keyuncrypt = storedData.split(",");
				var usrtoken = $crypto.decrypt(keyuncrypt[0]);
				var usrid = $crypto.decrypt(keyuncrypt[1],usrtoken);
				return usrid;
			}
		},
		GetUserName:function(){
			var storedData = localStorage.getItem('KEG');
			if (storedData) {
				var keyuncrypt = storedData.split(",");
				var usrtoken = $crypto.decrypt(keyuncrypt[0]);
				var usrname = $crypto.decrypt(keyuncrypt[2],usrtoken);
				return usrname;
			}
		},
		GetProfile:function(){
			var storedData = localStorage.getItem('KEG');
			if (storedData) {
				var keyuncrypt = storedData.split(",");
				var usrtoken = $crypto.decrypt(keyuncrypt[0]);
				var usrstatus = $crypto.decrypt(keyuncrypt[4], usrtoken);
				return usrstatus;
			} 
		},
		GetToken:function(){
			var storedData = localStorage.getItem('KEG');
			if (storedData) {
				var keyuncrypt = storedData.split(",");
				var usrtoken = $crypto.decrypt(keyuncrypt[0]);
				return usrtoken;
			} 
		},
		GetGender:function(){
			var storedData = localStorage.getItem('KEG');
			if (storedData) {
				var keyuncrypt = storedData.split(",");
				var usrtoken = $crypto.decrypt(keyuncrypt[0]);
				var usrsex = $crypto.decrypt(keyuncrypt[6], usrtoken);
				return usrsex;
			} 
		},
		ExpirePassport:function(){
			localStorage.removeItem('KEG');
			$state.go('login');
		}
    }; // Note the full endpoint address
});

