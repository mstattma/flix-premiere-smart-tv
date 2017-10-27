(function(){"use strict";var base=ViewControllerManager.findClass("ViewControllerNav");ViewControllerManager.newClassDef("ModalSignRegVC",Class.create({_extends_:base,_init_:function(args){base.call(this,args);this.activeChild='btnSignInSignReg';this.navigation={btnSignInSignReg:{Down:'btnRegisterSignReg'},btnRegisterSignReg:{Up:'btnSignInSignReg'}};},onLoad:function(){},onUnload:function(){},render:function(location){this._super(location);this.activeChild='btnSignInSignReg';this.enable();$(this.rootID+' #btnSignInSignReg').html(language[Model.App.file.language].loginScreen.btn_signin);$(this.rootID+' #btnRegisterSignReg').html(language[Model.App.file.language].loginScreen.btn_register);$(this.rootID+' #messageSignReg').html(language[Model.App.file.language].loginScreen.signin_or_register);$(this.rootID+' #backSignReg').html(language[Model.App.file.language].common.btn_back);$(this.rootID+' #backSignReg').removeClass('focus');},onKeyDown:function(e,keyCode){TVA.log('keydown in '+this.name);$('.hoveritemBack').removeClass('active');if(Model.App.listen){switch(keyCode){case Keys.getBind("Circle"):case Keys.getBind("Back"):this.onClose();e.stopPropagation();break;case Keys.getBind("Exit"):e.stopPropagation();break;case Keys.getBind("Up"):this._navigate("Up",e);e.stopPropagation();break;case Keys.getBind("Down"):this._navigate("Down",e);e.stopPropagation();break;case Keys.getBind("Left"):this._navigate("Left",e);e.stopPropagation();break;case Keys.getBind("Right"):this._navigate("Right",e);e.stopPropagation();break;case Keys.getBind("Cross"):case Keys.getBind("Enter"):$('#'+TVA.onFocus).click();break;}}},_navigate:function(direction,e){var nextChild=this.navigation[this.activeChild][direction];if(nextChild&&this.children[nextChild]){this.children[nextChild].view.enable();e.stopPropagation();}else if($(this.rootID).find('#'+nextChild).length){TVA.setFocus(nextChild);this.activeChild=nextChild;e.stopPropagation();}},onClose:function(){$(this.rootID+' .active').removeClass('active');this.parentVC.backToPrevious();},onHover:function(e){this._enableElement(e.target.id);e.stopPropagation();},onMouseLeave:function(e){$('#'+e.target.id).removeClass('active');},onBackHover:function(e){$('#'+e.target.id).addClass('active');},btnClick:function(e){Model.App.showPinBeforeDetails=true;var id=e.target.id;var profile=ViewControllerManager.find('Profile');this.onClose();if(id==='btnSignInSignReg'){profile.showSignIn();}else if(id==='btnRegisterSignReg'){profile.showRegister();}
$('#Screen').hide();Util.hideSpriteLoader();}}));})();