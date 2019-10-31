
/* globals alert */
'use strict';

angular.module('procyonApp')
.controller('TfcmonCtrl',['$scope', '$cookieStore', 'Global', 'createDialog', '$timeout', '$filter', '$rootScope', function ($scope, $cookieStore, Global, createDialog, $timeout, $filter, $rootScope)  {

   $scope.descriPrg = Global.descriPrg;
   var acesso = $cookieStore.get(Global.cookAcesso); //obtem dados da sessao
   var opcPag = 'inclui';
   var wllinha = 0;
   var wltotpag = 0;
   var wlpagamento = '';
   var wlnovamsg = '';
   var wlindcartao = 0;
   var wcgcofi;
   var regatu = '';
   $scope.pagamento = {};
   $scope.pagamento.qtparc = 1;
   $scope.cliente = {};
   $scope.listTipdoc = [];
   $scope.listTipoCartao = [];
   $scope.mostraChorc = false;
   Global.codprg = 'tfcmon';

   //Inicio logica JS

   $scope.init = function() {
      $scope.mostraCartao = false;
      $scope.mostraVcto = false;
      $scope.indexSel = 0;
      //logica de inicializacao
      //inicia grade Passagens
      var funcOrdenaData = function(a,b) {
         //dd/mm/aaaa
         a = new Date(a.split("/")[2], a.split("/")[1], a.split("/")[0]);
         b = new Date(b.split("/")[2], b.split("/")[1], b.split("/")[0]);
         //compare valor
         if (a < b) {
           return -1;
         }
         else if (a > b) {
           return 1;
         }
         else {
           return 0;
         }
      };

      $scope.mostraBtnPgto = true;
      $scope.mostraBtnNF = true;
      $scope.cliente.envemail = false;
      $scope.mostraBtnGrade = false;
      $scope.mostraBtnPag = false;
      $scope.abaSelec = 1;
      $scope.cliente = {};
      $scope.listaPassagens = [];
      $scope.regSelecPassagens = [];
      $scope.gridPassagens = {
         data: 'listaPassagens',
         i18n: ['pt-br'],
         multiSelect: false,
         showFilter: true,
         headerRowHeight: 22,
         rowHeight: 20,
         selectedItems: $scope.regSelecPassagens,
         columnDefs: [
            {field: 'situac', displayName: 'Tipo', width: 40},
            {field: 'placa', displayName: 'Placa', cellClass: 'text-right', width: 80},
            {field: 'dtpsg', displayName: 'Abertura', cellClass: 'text-right', sortFn: funcOrdenaData, width: 80},
            {field: 'idipas', displayName: 'OS', width: 60},
            {field: 'kilome', displayName: 'KM', cellClass: 'text-right', width: 60},
            // {field: 'totrel' , displayName: 'Relatos', cellClass: 'text-right', width: 60},
            {field: 'totser' , displayName: 'Serviços', cellClass: 'text-right', width: 60},
            {field: 'totpec' , displayName: 'Peças', cellClass: 'text-right', width: 60},
            {field: 'vltot' , displayName: 'Total', cellClass: 'text-right', width: 60},
            // {field: 'temetq' , displayName: 'Etiqueta', cellClass: 'text-Center', width: 80},
            {field: 'nomecli' , displayName: 'Nome do Cliente', cellClass: 'text-Left', width: 200},
            {field: 'fonecli' , displayName: 'Fone', cellClass: 'text-Left', width: 120},
            // {field: 'numped' , displayName: 'Nr Pedido', cellClass: 'text-right', width: 75},
            {field: 'numnfe' , displayName: 'NF-e', cellClass: 'text-right', width: 75},
            {field: 'numrps' , displayName: 'Nr RPS', cellClass: 'text-right', width: 75},
            {field: 'numnfse' , displayName: 'NFS-e', cellClass: 'text-right', width: 75},
            {field: 'dtfech' , displayName: 'Fechamento', cellClass: 'text-right', width: 80},
            {field: 'conpag' , displayName: 'Recebimento', cellClass: 'text-Left', width: 250},
            {field: 'branco', displayName: '', width: '*'}
         ]
         // ,
         // afterSelectionChange: function(rowItem, event) {
         //    $scope.indexSel = rowItem.rowIndex;
         // }
      };

      //inicia grade Faturamento
      $scope.listaFaturamento = [];
      $scope.regSelecFat = [];
      $scope.gridFaturamento = {
         data: 'listaFaturamento',
         i18n: ['pt-br'],
         multiSelect: false,
         showFilter: false,
         headerRowHeight: 22,
         rowHeight: 20,
         selectedItems: $scope.regSelecFat,
         columnDefs: [
            {field: 'despag', displayName: 'Tipo de Pagamento', width: 200},
            {field: 'qtdtot', displayName: 'Qtd', cellClass: 'text-right', width: 35},
            {field: 'valor', displayName: 'Valor', cellClass: 'text-right', width: 70},
            {field: 'perc', displayName: '%', cellClass: 'text-right', width: 50},
            {field: 'branco', displayName: '', width: '*'}
         ]
      };

      //inicia grade Serv
      $scope.listaServ = [];
      $scope.regSelecServ = [];
      $scope.gridServicos = {
         data: 'listaServ',
         i18n: ['pt-br'],
         multiSelect: false,
         showFilter: false,
         headerRowHeight: 22,
         rowHeight: 20,
         selectedItems: $scope.regSelecServ,
         columnDefs: [
            {field: 'descri', displayName: 'Descrição', width: 200},
            {field: 'qtdtot', displayName: 'Qtd', cellClass: 'text-right', width: 35},
            {field: 'vltot', displayName: 'Total R$', cellClass: 'text-right', width: 70},
            {field: 'perc', displayName: '%', cellClass: 'text-right', width: 50},
            {field: 'branco', displayName: '', width: '*'}
         ]
      };

      //inicia grade Pecas
      $scope.listaPecas = [];
      $scope.regSelecPecas = [];
      $scope.gridPecas = {
         data: 'listaPecas',
         i18n: ['pt-br'],
         multiSelect: false,
         showFilter: false,
         headerRowHeight: 22,
         rowHeight: 20,
         selectedItems: $scope.regSelecPecas,
         columnDefs: [
            {field: 'descri', displayName: 'Descrição', width: 200},
            {field: 'qtdtot', displayName: 'Qtd', cellClass: 'text-right',  width: 35},
            {field: 'vltot', displayName: 'Total R$', cellClass: 'text-right', width: 70},
            {field: 'perc', displayName: '%', cellClass: 'text-right', width: 50},
            {field: 'branco', displayName: '', width: '*'}
         ]
      };

      //inicia grade Pagamento
      $scope.listaPagamento = [];
      $scope.regSelecPagamento = [];
      var botaoExcPag = '<button  type="button" id="btnExcPag" class="btn mini btnform" ng-click="clickExcPag($index)" title="Excluir"> <i class="icon-trash"></i> </button>';
      var botaoModPag = '<button  type="button" id="btnModPag" class="btn mini btnform" ng-click="clickModPag($index)" title="Modificar"> <i class="icon-edit"></i> </button>';
      $scope.gridPagamento = {
         data: 'listaPagamento',
         i18n: ['pt-br'],
         multiSelect: false,
         showFilter: false,
         headerRowHeight: 22,
         rowHeight: 20,
         selectedItems: $scope.regSelecPagamento,
         columnDefs: [
            {field: 'tippag', displayName: 'Tipo', width: 50},
            {field: 'despag', displayName: 'Forma de Pagamento', width: 200},
            {field: 'valor', displayName: 'Valor Original', cellClass: 'text-right', width: 120},
            {field: 'dtvenc', displayName: 'Data', cellClass: 'text-right', width: 80},
            {field: 'vlreal', displayName: 'Valor a Receber', cellClass: 'text-right', width: 120},
            {field: 'tipcartao', displayName: 'Tipo', cellClass: 'text-right', width: 120},
            {field: 'remove', displayName: '', cellTemplate: botaoExcPag, width: 25},
            {field: 'edit'  , displayName: '', cellTemplate: botaoModPag, width: 25},
            {field: 'branco', displayName: '', width: '*'}
         ]
      };

      //inicia grade Cliente
      // $scope.listaClientes = [];
      // $scope.regSelecCliente = [];
      // $scope.gridCliente = {
      //    data: 'listaClientes',
      //    i18n: ['pt-br'],
      //    multiSelect: false,
      //    showFilter: false,
      //    headerRowHeight: 22,
      //    rowHeight: 20,
      //    selectedItems: $scope.regSelecCliente,
      //    columnDefs: [
      //       {field: 'nome', displayName: 'Nome', width: 200},
      //       {field: 'e_mail', displayName: 'Email', width: 200},
      //       {field: 'fone', displayName: 'Fone', width: 130},
      //       {field: 'branco', displayName: '', width: '*'}
      //    ]
      // };

      //inicia grade Fcmsg
      // $scope.listaMsg = [];
      // $scope.regSelecMsg = [];
      // $scope.gridFcmsg = {
      //    data: 'listaMsg',
      //    i18n: ['pt-br'],
      //    multiSelect: false,
      //    showFilter: true,
      //    enableHighlighting: true,
      //    headerRowHeight: 22,
      //    rowHeight: 20,
      //    selectedItems: $scope.regSelecMsg,
      //    columnDefs: [
      //       {field: 'tipenv', displayName: 'Envio', width: 70},
      //       {field: 'tipmsg', displayName: 'Tipo', width: 50},
      //       {field: 'destip', displayName: 'Descrição', width: 250},
      //       {field: 'datenv', displayName: 'Envio', width: 70},
      //       {field: 'horenv', displayName: 'Hora', width: 70},
      //       {field: 'situac', displayName: 'Sit', width: 30},
      //       {field: 'branco', displayName: '', width: '*'}
      //    ],
      //    afterSelectionChange: function(rowItem, event) {
      //       // $scope.indexSel = rowItem.rowIndex;
      //       // $scope.arrayIdx = $scope.gridFcmsg.ngGrid.rowMap.indexOf(rowItem.rowIndex);
      //       // console.log('indexSel', $scope.indexSel, 'arrayIdx', $scope.arrayIdx);
      //       $scope.clickListaMsg();
      //       $scope.mostraGravaMsg = true;
      //    }
      // };
      $scope.initListas();
      $scope.parMon = {
         datfim: Global.hoje(),
         datini: Global.primeiroDiaMes(Global.hoje())
      };
      $scope.pagamento.dtvcto = Global.hoje();
      $scope.pagamento.diaspag = 0;

   };

   $scope.cClassBtn = function(cor) {
      $timeout(function() {
         $scope.classBtn = cor;
      }, 100);
   };

   $scope.changeDatfim = function() {
      $scope.cClassBtn('red');
   }; //
   $scope.changeDatini = function() {
      $scope.cClassBtn('red');
   }; //
   $scope.changeSituac = function() {
      $scope.cClassBtn('red');
   }; //

   $scope.iniciaClientes = function() {
      var initWfcvei = {
         servico: 'wfcvei',
         metodo: 'listaPlacas',
         opcoes: {
            pemail:acesso.email,
            pplaca: $scope.regSelecPassagens[0].placa
         }
      };

      Global.init(initWfcvei)
      //dispara chamada ao servidor
      .callService(function(data){
         var wfcvei = Global.callbackCallServiceSuccess(data);
         if (wfcvei.retorno[0].tipret !== 'err') {
            $scope.fcvei = wfcvei.dados;
            $scope.listaClientes = $scope.fcvei;
         }

      });
   };

   $scope.clickConsulta = function() {
      var initWfcpas = {
         servico: 'wfcpas',
         metodo: 'ListaPassagens',
         opcoes: {
            pemail: acesso.email,
            pdatini: $scope.parMon.datini,
            pdatfim: $scope.parMon.datfim,
            psituac: $scope.parMon.situac
         }
      };

      Global.init(initWfcpas)
      //dispara chamada ao servidor
      .callService(function(data){
         var wfcpas = Global.callbackCallMultiServiceSuccess(data);


         if (wfcpas.retorno[0].tipret !== 'err') {
            $scope.cClassBtn('grey');
            wcgcofi = wfcpas.retorno[0].ultcgc;
            $scope.passagens = wfcpas.dados;
            $scope.ttresumo = $scope.passagens.ttresumo[0];
            setTimeout(function() {
               $scope.ttresumo.perpec = Global.formataValor($scope.ttresumo.perpec, 2);
               $scope.ttresumo.perserv = Global.formataValor($scope.ttresumo.perserv, 2);
               $scope.ttresumo.vlserv = Global.formataValor($scope.ttresumo.vlserv, 2);
               $scope.ttresumo.vlpec = Global.formataValor($scope.ttresumo.vlpec, 2);
               $scope.ttresumo.vltotal = Global.formataValor($scope.ttresumo.vltotal, 2);
               $scope.ttresumo.tikmed = Global.formataValor($scope.ttresumo.tikmed, 2);
            }, 10);
            $scope.listaPecas = $scope.passagens.ttpec;
            $scope.listaServ = $scope.passagens.ttserv;
            $scope.listaFaturamento = $scope.passagens.ttpagto;

            setTimeout(function() {
               angular.forEach($scope.listaPecas, function(value, key) {
                  $scope.listaPecas[key].vltot = Global.formataValor($scope.listaPecas[key].vltot, 2);
                  $scope.listaPecas[key].perc = Global.formataValor($scope.listaPecas[key].perc, 2);
               });
            }, 10);

            setTimeout(function() {
               angular.forEach($scope.listaServ, function(value, key) {
                  $scope.listaServ[key].vltot = Global.formataValor($scope.listaServ[key].vltot, 2);
                  $scope.listaServ[key].perc = Global.formataValor($scope.listaServ[key].perc, 2);
               });
            }, 10);

            setTimeout(function() {
               angular.forEach($scope.listaFaturamento, function(value, key) {
                  $scope.listaFaturamento[key].valor = Global.formataValor($scope.listaFaturamento[key].valor, 2);
                  $scope.listaFaturamento[key].perc = Global.formataValor($scope.listaFaturamento[key].perc, 2);
               });
            }, 10);

            $scope.listaPassagens = $scope.passagens.ttfccpvl;
            angular.forEach($scope.listaPassagens, function(value, key) {
               $scope.listaPassagens[key].dtpsg = Global.formataDataView($scope.listaPassagens[key].dtpsg);
               $scope.listaPassagens[key].dtfech = Global.formataDataView($scope.listaPassagens[key].dtfech);
               $scope.listaPassagens[key].temetq = ($scope.listaPassagens[key].temetq == false ? 'Não' : 'Sim');
               $scope.listaPassagens[key].kilome = Global.formataValor($scope.listaPassagens[key].kilome, 0);
               $scope.listaPassagens[key].vltot = Global.formataValor($scope.listaPassagens[key].vltot, 2);
               $scope.listaPassagens[key].totpec = (value.exival == 'S' ? Global.formataValor(value.totpec, 2) : value.totpec);
               $scope.listaPassagens[key].totser = (value.exival == 'S' ? Global.formataValor(value.totser, 2) : value.totser);
               if ($scope.listaPassagens[key].idipas == regatu) {
                  $scope.indexSel = key;
               };
            });
         }else{
            $scope.listaPassagens = {};
            $scope.pagamento = {};
            $scope.ttresumo = {};
            $scope.listaPecas = {};
            $scope.listaServ = {};
         }
      });
      $scope.gridPassagens.selectRow(0,true);
   };

   $scope.clickPagPas = function() {
      console.log('pagaps', $scope.regSelecPassagens[0].estzero);
      if ($scope.regSelecPassagens[0].estzero == true ) {
         Global.alertas('erro','Ordem de Serviço contem itens sem estoque, ajuste a quantidade para poder fechar', 8000);
         return;
      };
      if ($scope.regSelecPassagens[0].vltot == '0,00' && $scope.regSelecPassagens[0].situac == 'ORC') {
         $scope.pagamento.orcpas  = 'S';
         angular.element('#fcpas-ifsemvalor').modal('show');
         return;
      };
      angular.element('#passagem-idModalPag').modal('show');
      $scope.mostraCartao = false;
      $scope.mostraVcto = false;
      $scope.listaPagamento = [];
      if ($scope.regSelecPassagens[0].conpag != '') {
         $scope.buscaPagtos();
      };
      $scope.mostraBtnPag = false;
      $scope.pagamento.orcpas  = 'S';
      $scope.pagamento.vltotal = $scope.regSelecPassagens[0].vltot;
      $scope.pagamento.saldo   = $scope.regSelecPassagens[0].vltot;
      $scope.pagamento.valor   = $scope.regSelecPassagens[0].vltot;
      $scope.pagamento.totpag  = 0;
      $scope.mostraChorc = ($scope.regSelecPassagens[0].situac == 'PAS' ? false : true);
      $scope.atualizaSaldo();
      if ($scope.pagamento.valor != '0,00') {
         setTimeout(function() {
            $('#pagamento-tippag').select2('open');
         }, 800);
      };
   };

   $scope.buscaPagtos = function() {
      var initWfcpas = {
         servico: 'wfcpas',
         metodo: 'listaPagto',
         opcoes: {
            pemail: acesso.email,
            pidgpas: $scope.regSelecPassagens[0].idgpas
         }
      };

      Global.init(initWfcpas)
      //dispara chamada ao servidor
      .callService(function(data){
         var wfcpas = Global.callbackCallServiceSuccess(data);
         if (wfcpas.retorno[0].tipret !== 'err') {
            $scope.listaPagamento = wfcpas.dados;
            angular.forEach($scope.listaPagamento, function(value, key) {
               $scope.listaPagamento[key].valor = Global.formataValor($scope.listaPagamento[key].valor, 2);
               $scope.listaPagamento[key].vlreal = Global.formataValor($scope.listaPagamento[key].vlreal, 2);
               $scope.listaPagamento[key].dtvenc = Global.formataDataView($scope.listaPagamento[key].dtvenc);
            });
         }
      });
   };

   $scope.clickSalvaPag= function() {

      // opcPag = 'inclui';
      if(($scope.pagamento.dtvcto == '' || $scope.pagamento.dtvcto == undefined) && $scope.pagamento.diaspag == 0 ){
         $scope.pagamento.dtvcto = Global.hoje();
         $scope.pagamento.diaspag = 0;
      };

      $scope.pagamento.valor = angular.element('#pagamento-valor').val();
      $scope.pagamento.idadm = angular.element('#pagamento-idadm').val();
      $scope.pagamento.dtvcto = angular.element('#pagamento-dtvcto').val();

      var wlvlreal = Global.removeFormatoValor($scope.pagamento.valor);

      if($scope.pagamento.valor == '0,00' || $scope.pagamento.valor == 0 || $scope.pagamento.valor == undefined){
         Global.alertas('erro','Valor não pode ficar em branco', 8000);
         setTimeout(function() {
            angular.element('#pagamento-valor').focus();
         }, 10);
         return;
      }
      if ($scope.pagamento.tippag == '' || $scope.pagamento.tippag == undefined) {
         Global.alertas('erro','Informe a forma de pagamento', 8000);
         setTimeout(function() {
            angular.element('#pagamento-tippag').focus();
         }, 100);
         return;
      }
      if ($scope.pagamento.tippag == 'CC' && ($scope.pagamento.idadm == '' || $scope.pagamento.idadm == undefined)) {
         Global.alertas('erro','Selecione o Tipo de Cartão', 8000);
         setTimeout(function() {
            angular.element('#pagamento-idadm').focus();
         }, 100);
         return;
      }
      if (opcPag == 'inclui') {
         if($scope.listaPagamento== undefined){
            $scope.listaPagamento = [];
         };
         if ($scope.pagamento.taxa != 0){
            wlvlreal = Global.removeFormatoValor($scope.pagamento.valor) -  (Global.removeFormatoValor($scope.pagamento.valor) * Global.removeFormatoValor($scope.pagamento.taxa) / 100);
            // wlvlreal = Global.formataValor(wlvlreal, 2);
         }
         var i;
         var wlvlparc = 0;
         if ($scope.pagamento.qtparc == 0) {
            $scope.pagamento.qtparc = 1;
         };
         wlvlparc = wlvlreal / $scope.pagamento.qtparc;
         for (i = 0; i < $scope.pagamento.qtparc; i++) {
            $scope.listaPagamento.push({
               valor:Global.formataValor(Global.removeFormatoValor($scope.pagamento.valor) / $scope.pagamento.qtparc),
               tippag:$scope.pagamento.tippag,
               // dtvenc:(Global.somadias(Global.hoje(), $scope.pagamento.diaspag * (i + 1))),
               dtvenc:(Global.somadias($scope.pagamento.dtvcto, $scope.pagamento.diaspag * (i + 1))),
               vlreal:Global.formataValor(wlvlparc, 2),
               idadm:$scope.pagamento.idadm,
               nrparc: i + 1,
               qtparc: $scope.pagamento.qtparc,
               tipcartao:($scope.pagamento.tippag == 'CT' ? $scope.listCartao[wlindcartao].descri : ''),
               // vlreal:Global.formataValor($scope.pagamento.valor, 2),
               despag:$("#pagamento-tippag").select2('data').text
            });
         };
         $scope.mostraCartao = false;
         $scope.mostraVcto = false;
      } else { //modifica
         // $scope.mostraRelato = false;
         $scope.listaPagamento[$scope.pagamento.indice] = {
            valor:$scope.pagamento.valor,
            tippag:$scope.pagamento.tippag,
            despag:$("#pagamento-tippag").select2('data').text
         };
         // inclui uma linha em branco para poder atualizar a grade, logo depois exclui a ultima linha
         $timeout(function() {
            $scope.listaPagamento.push({
               valor:''
            });
            // $scope.pagamento = {};
         }, 10);
         $timeout(function() {
            $scope.listaPagamento.pop(); // remove a ultima linha da grade
         }, 50);
         opcPag = 'inclui'
      }
      $scope.pagamento.dtvcto = Global.hoje();
      $scope.pagamento.diaspag = 0;
      $scope.pagamento.taxa = 0;
      $scope.pagamento.tippag = '';
      $scope.pagamento.idadm = '';
      $scope.pagamento.qtparc = 1;
      $scope.mostraCartao = false;
      $scope.mostraVcto = false;
      $scope.atualizaSaldo();
      if ($scope.pagamento.valor != '0,00') {
         $timeout(function() {
            // angular.element('#pagamento-valor').focus();
            $('#pagamento-tippag').select2('open')
            wllinha = wllinha + 1;
         }, 300);
      };
   };

   $scope.clickExcPag = function() {
      var index = this.row.rowIndex;
      // $scope.mostraRelato = false;
      $scope.listaPagamento.splice(index, 1);
      $scope.mostraBtnPag = false;
      $scope.pagamento.valor = $scope.pagamento.saldo;
      $scope.pagamento.diaspag = 0;
      $scope.pagamento.taxa = 0;
      $scope.pagamento.tippag = '';
      $scope.pagamento.idadm = '';
      $scope.mostraCartao = false;
      $scope.mostraVcto = false;
      $scope.atualizaSaldo();
   };

   $scope.clickModPag = function() {
      opcPag = 'altera';

      var index = this.row.rowIndex;
      $timeout(function()
         {angular.element('#pagamento-tippag').focus()},
      10);
      $scope.pagamento.tippag = $scope.listaPagamento[index].desabr;
      $scope.pagamento.valor  = $scope.listaPagamento[index].valor;
      $scope.pagamento.indice = index;
   };

   $scope.atualizaSaldo = function() {
       wltotpag = 0;
      angular.forEach($scope.listaPagamento, function(value, key) {
         wltotpag = Global.formataValor(Global.removeFormatoValor(wltotpag) +
                    Global.removeFormatoValor($scope.listaPagamento[key].valor));
      });
      // $scope.pagamento.vltotal
      $scope.pagamento.saldo = Global.formataValor(Global.removeFormatoValor($scope.pagamento.vltotal) -
                               Global.removeFormatoValor(wltotpag));
      console.log('saldo antes',$scope.pagamento.saldo);
      if (Global.removeFormatoValor($scope.pagamento.saldo) < 0) {
         $scope.pagamento.saldo = 0;
         $scope.pagamento.totpag = $scope.pagamento.vltotal;
      }else{
         $scope.pagamento.totpag = wltotpag;
      };
      $scope.pagamento.valor = $scope.pagamento.saldo;
      // $scope.pagamento.valor = angular.element('#pagamento-saldo').val();
      if ($scope.pagamento.saldo == 0 || $scope.pagamento.saldo == '0,00') {
         $scope.mostraBtnPag = true;
      };
   };

   $scope.clickGravaPagamento = function() {
      var jsonPag = $scope.jsonPag();
      if ($scope.pagamento.totpag > $scope.pagamento.vltotal) {
         Global.alertas('erro','Valores pagos devem ser igual ou menor que o valor total.', 8000);
         setTimeout(function() {
            angular.element('#pagamento-valor').focus();
         }, 100);
         return;
      }else{
         angular.element('#passagem-idModalPag').modal('hide');
      }

      angular.forEach($scope.listaPagamento, function(value, key) {
         wlpagamento = wlpagamento + $scope.listaPagamento[key].tippag + '='
                                   + $scope.listaPagamento[key].valor + '|';
      });

      var initWfcpas = {
         servico: 'wfcpas',
         metodo: 'GravaPagamento',
         opcoes: {
            pemail: acesso.email,
            pidgpas: $scope.regSelecPassagens[0].idgpas,
            ppagamento: wlpagamento,
            pjsonPag: jsonPag,
            porcpas: $scope.pagamento.orcpas
         }
      };

      Global.init(initWfcpas)
      //dispara chamada ao servidor
      .callService(function(data){
         var wfcpas = Global.callbackCallServiceSuccess(data);
         if (wfcpas.retorno[0].tipret !== 'err') {
            $scope.fcpas = wfcpas.dados[0];
            $scope.clickConsulta();
         }

      });
   };

   $scope.jsonPag = function() {
      //json itens
      var jsonPag = '';
      var tttippag = [];
      if ($scope.listaPagamento.length != 0) {
         for (var i = 0; i < $scope.listaPagamento.length; i++) {
            tttippag.push({
               idgpas:$scope.regSelecPassagens[0].idgpas,
               tippag:$scope.listaPagamento[i].tippag.toUpperCase(),
               idadm:$scope.listaPagamento[i].idadm,
               nrparc:$scope.listaPagamento[i].nrparc,
               qtparc:$scope.listaPagamento[i].qtparc,
               vlmov:Global.removeFormatoValor($scope.listaPagamento[i].valor),
               vlreal:Global.removeFormatoValor($scope.listaPagamento[i].vlreal),
               dtvcto:Global.formataDataProgress($scope.listaPagamento[i].dtvenc),
               // vlmov:$scope.listaPagamento[i].idipas,
            });
         };

         $scope.saida2 = [];
         $scope.saida2.push(
         {
            tttippag: tttippag
         });

         //parseJson no registro unico para json e minify
         jsonPag = JSON.minify($filter('json')($scope.saida2[0]));
      } else {
         jsonPag = '';
      }
      return jsonPag;
   };

   $scope.mostraBotoes = function() {
      if (($scope.regSelecPassagens[0].totpec > 0 || $scope.regSelecPassagens[0].totser > 0)
           || $scope.regSelecPassagens[0].situac == 'PAS')  {
         $scope.mostraBtnPgto = true;
      };
      if ($scope.regSelecPassagens[0].totpec == '0,00' && $scope.regSelecPassagens[0].totpec == '0,00'){
         $scope.mostraBtnPgto = true;
         $scope.mostraBtnNF = true;
      };

      if ($scope.regSelecPassagens[0].situac == 'PAS' ) {
         $scope.mostraBtnNF = true;
      };
      $scope.mostraBtnGrade = true;
   };

   $scope.initListas = function() {
      var initWfcfin = {
         servico: 'wfcfin',
         metodo: 'IniciaListas',
         opcoes: {
            pemail:acesso.email
         }
      };

      Global.init(initWfcfin)
      //dispara chamada ao servidor
      .callService(function(data){
         var wfcfin = Global.callbackCallMultiServiceSuccess(data);
         if (wfcfin.retorno[0].tipret !== 'err') {
            $scope.litpdc = wfcfin.dados.ttlitpdc;
            $scope.listCartao = wfcfin.dados.ttcartao;
            // $scope.oridoc = wfcfin.dados.ttoridoc;
            angular.forEach($scope.litpdc, function(value, key) {
               $scope.listTipdoc.push({id: value.codtab.toString().trim().toUpperCase(),
                                       text: value.descri.toString().trim().toUpperCase()});
            })
            angular.forEach($scope.listCartao, function(value, key) {
               // $scope.listCartao[key].taxa = Global.formataValor($scope.listCartao[key].taxa, 2)
               $scope.listTipoCartao.push({id: value.codtab.toString().trim().toUpperCase(),
                                          text: value.descri.toString().trim().toUpperCase()});
            })

            // angular.forEach($scope.oridoc, function(value, key) {
            //    $scope.listOrigens.push({id: value.codtab.toString().trim().toUpperCase(),
            //                             text: value.descri.toString().trim().toUpperCase()});
            // })
         }
      });
   }
   $scope.clickPrintPas = function() {
      // Informacoes para passar para o controller que vai mexer no modal
      var opts = {
         par: {
            idgpas: $scope.regSelecPassagens[0].idgpas,
            nomecli: $scope.regSelecPassagens[0].nomecli,
            emailcli: $scope.regSelecPassagens[0].emailcli,
            idcli: $scope.regSelecPassagens[0].idcli
         },
         Global: Global
      };
      var retornoZoom = {};

      // Informacoes de parametros de definicao da modal
      var modalPar = {
         id: 'zfcimp01',
         view: 'zfcimp01',
         controller: 'Zfcimp01Ctrl',
         title: 'Impressão',
         success: {},
         close: {
            fn: function(){
               //acao executada ao fechar modal
               retornoZoom = $cookieStore.get('par_zfcimp01');
               if (retornoZoom != undefined) {
                  //tratamento do retorno
               }
               $cookieStore.remove('par_zfcimp01');
            }
         }
      };

      //chamada para inclusao da modal na tela
      Global.callModal(modalPar, opts );

      // $scope.iniciaClientes();
      // $scope.cliente.emailcli = $scope.regSelecPassagens[0].emailcli;
      // $scope.cliente.tipimp = 'si';
      // $scope.cliente.nome = $scope.regSelecPassagens[0].nomecli;
      // setTimeout(function() {
      //    if ($scope.cliente.emailcli == '' || $scope.cliente.emailcli == undefined) {
      //       $scope.temEmail = false;
      //    };
      // }, 10);
      // console.log('cliente', $scope.cliente);
   };

   $scope.clickCancPas = function() {
      console.log('selec',$scope.regSelecPassagens);
      if ($scope.regSelecPassagens[0].numnfse != '' || $scope.regSelecPassagens[0].numnfe != '') {
         Global.alertas('erro','Passagem com NF emitida não pode ser cancelada', 8000);
         return;
      };
      if ($scope.regSelecPassagens[0].situac == 'CAN') {
         Global.alertas('erro','Passagem já está cancelada!', 8000);
         return;
      };
      $scope.cancela = {
         nome: $scope.regSelecPassagens[0].nomecli,
         dtpsg: $scope.regSelecPassagens[0].dtpsg,
         placa: $scope.regSelecPassagens[0].placa
      };
      angular.element('#passagem-idCancela').modal('show');
   };

   $scope.clickGravaCan = function() {
      var initWfcpas = {
         servico: 'wfcpas',
         metodo: 'CancelaPassagem',
         opcoes: {
            pemail: acesso.email,
            pidgpas: $scope.regSelecPassagens[0].idgpas,
            pobserv: $scope.cancela.observ
         }
      };
      Global.init(initWfcpas)
      //dispara chamada ao servidor
      .callService(function(data){
         var wfcpas = Global.callbackCallServiceSuccess(data);
         if (wfcpas.retorno[0].tipret !== 'err') {
            $scope.fcpas = wfcpas.dados[0];
            $scope.clickConsulta();
         }
      });
   };

   $scope.mudouTipDoc = function(tipPag) {
      if (tipPag == 'CT') {
         $scope.mostraCartao = true;
         $scope.mostraVcto = false;
         // $scope.pagamento.idadm = '';
         setTimeout(function() {
            $('#pagamento-idadm').select2('open');
         }, 100);
      }else{
         $scope.mostraCartao = false;
      };
      if (tipPag == 'BO' || tipPag == 'CH' || tipPag == 'TR' || tipPag == 'OU') {
         $scope.pagamento.dtvcto = Global.hoje();
         $scope.mostraVcto = true;
         $scope.mostraCartao = false;
         angular.element('#pagamento-dtvcto').select();
      }else{
         angular.element('#pagamento-valor').select();
         $scope.mostraVcto = false;
      };
   };

   $scope.mudouCartao = function() {
      angular.forEach($scope.listCartao, function(value, key) {
         // $scope.listTipoCartao[key].vltot = Global.formataValor($scope.listTipoCartao[key].vltot, 2);
         // $scope.listTipoCartao[key].perc = Global.formataValor($scope.listTipoCartao[key].perc, 2);
         if ($scope.listCartao[key].codtab == $scope.pagamento.idadm) {
            $scope.pagamento.diaspag = $scope.listCartao[key].dias;
            $scope.pagamento.taxa = Global.formataValor($scope.listCartao[key].taxa);
            $scope.pagamento.qtparc = 1;
            wlindcartao = key;
         };
      });
      angular.element('#pagamento-valor').select();
   };

   $scope.clickImprime = function() {
      // $scope.iniciaClientes();
      var wlidgpas = $scope.regSelecPassagens[0].idgpas;
      var wlidusu  = $scope.regSelecPassagens[0].idcli;
      var wlemail  = ($scope.cliente.envemail == undefined ? ' ' : $scope.cliente.envemail);
      // window.open('http://pro03des.procyon.com.br:3125/wss/fdcpdf/impRel.php?idgpas='+wlidgpas+'&idusu='+wlidusu+'&v=B','_blank');
      // window.open('http://u756270672.hostingerapp.com/wss/fdcpdf/impRel.php?idgpas=665441');
      // window.open('http://fdc.procyon.com.br/wss/fdcpdf/impRel.php?idgpas='+wlidgpas+"'");
      window.open('http://fdc.procyon.com.br/wss/fdcpdf/impRel.php?idgpas=665441&e=N');

   };

   $scope.keyupData = function() {
      if (event.keyCode == 13) { // se for teclar <ENTER>
         angular.element('#pagamento-valor').select();
      };
   };

   $scope.keyupValor = function() {
      if (event.keyCode == 13) { // se for teclar <ENTER>
         if ($scope.mostraCartao==true) {
             angular.element('#pagamento-qtparc').select();
         }else{
            $scope.clickSalvaPag();
         }
      };
   };

   $scope.keyupQtparc = function() {
      if (event.keyCode == 13) { // se for teclar <ENTER>
         angular.element('#pagamento-diaspag').select();
      };
   };

   $scope.keyupDiaspag = function() {
      if (event.keyCode == 13) { // se for teclar <ENTER>
         angular.element('#pagamento-taxa').select();
      };
   };

   $scope.keyupTaxa = function(e) {
      if (e.keyCode == 13) { // se for teclar <ENTER>
         $scope.clickSalvaPag();
      };
   };

   $scope.clickWapMPas = function() {
      // Informacoes para passar para o controller que vai mexer no modal
      var opts = {
         par: {
            placa: $scope.regSelecPassagens[0].placa,
            email: $scope.regSelecPassagens[0].emailcli,
            fone: $scope.regSelecPassagens[0].fonecli,
            nome: $scope.regSelecPassagens[0].nomecli,
            app: $scope.regSelecPassagens[0].app
         },
         Global: Global
      };
      var retornoZoom = {};

      // Informacoes de parametros de definicao da modal
      var modalPar = {
         id: 'zfcmsg01',
         view: 'zfcmsg01',
         controller: 'Zfcmsg01Ctrl',
         title: 'Mensagens',
         w: '640px',
         success: {},
         close: {
            fn: function(){
               //acao executada ao fechar modal
               retornoZoom = $cookieStore.get('par_zfcmsg01');
               if (retornoZoom != undefined) {
                  //tratamento do retorno
               }
               $cookieStore.remove('par_zfcmsg01');
            }
         }
      };

      //chamada para inclusao da modal na tela
      Global.callModal(modalPar, opts );

      angular.element('#fcmon-Mensagem').modal('show');
      // var index = this.row.rowIndex;
      $scope.wapm = {
         placa:    $scope.regSelecPassagens[0].placa,
         email:    $scope.regSelecPassagens[0].emailcli,
         fone:     $scope.regSelecPassagens[0].fonecli,
         nome:     $scope.regSelecPassagens[0].nomecli
         // app:      $scope.regSelecPassagens[0].app
      };
   };

   $scope.clickNfs = function() {
      regatu = $scope.regSelecPassagens[0].idipas;
      if ($scope.regSelecPassagens[0].situac != 'PAS') {
         Global.alertas('erro','Emissão de NF não permitida para Orçamentos, informe a forma de pagamento e mude para Passagem', 8000);
         return;
      };
      if ($scope.regSelecPassagens[0].totpec == 0 && $scope.regSelecPassagens[0].totser == 0) {
         Global.alertas('erro','Para emissão de NF é necessário ter ao menos uma peça ou um serviço lançado.', 8000);
         return;
      };
      if ($scope.regSelecPassagens[0].cadok == 'N'){
         Global.alertas('erro','Para emissão de NF o cadastro do cliente deve estar completo.', 8000);
         return;
      };

      //Chamada zfcnfs
      Global.addTela({
         codprg: 'zfcnfs',

         parEnt: {
            pidgpas:$scope.regSelecPassagens[0].idgpas,
            numnfse:$scope.regSelecPassagens[0].numnfse,
            numrps:$scope.regSelecPassagens[0].numrps,
            numnfe:$scope.regSelecPassagens[0].numnfe,
            numped:$scope.regSelecPassagens[0].numped,
            idipas:$scope.regSelecPassagens[0].idipas,
            dtpsg:$scope.regSelecPassagens[0].dtpsg,
            cgcofi:wcgcofi
         },
         close: {
            fn: function() {
               console.log('linha no retorno', $scope.indexSel);
               $scope.clickConsulta();
               setTimeout(function() {
                  $scope.gridPassagens.selectRow($scope.indexSel);
               }, 500);
            }
         }
      });
   };

   $scope.clickAbreVoltraOrc=function(){
      if ($scope.regSelecPassagens[0].numnfse != '' || $scope.regSelecPassagens[0].numnfe != '') {
         Global.alertas('erro','Passagem com NF emitida não pode voltar para Orçamento, cancele a NF', 8000);
         return;
      };
       if ($scope.regSelecPassagens[0].situac == 'ORC') {
         Global.alertas('erro','Passagem já está com situação de Orçamento!', 8000);
         return;
      };
      angular.element('#fccpv-idVoltaOrc').modal('show');
   }
   $scope.clickVoltaOrc = function(){
      var initWfcpas = {
         servico: 'wfcpas',
         metodo: 'voltaOrc',
         opcoes: {
            pemail:acesso.email,
            pidgpas:$scope.regSelecPassagens[0].idgpas
         }
      };

      Global.init(initWfcpas)
      //dispara chamada ao servidor
      .callService(function(data){
         var wfcpas = Global.callbackCallServiceSuccess(data);
         if (wfcpas.retorno[0].tipret !== 'err') {
            $scope.fcpas = wfcpas.dados[0];
            $scope.clickConsulta();
         }
      });
   }

   $scope.abreTFCUSU = function() {
      //Chamada tfcusu
      Global.addTela({
         codprg: 'tfcusu',
         parEnt: {
            // email: $scope.regSelecCliente[0].email,
            idusu: $scope.regSelecPassagens[0].idcli,
            origem:'tfcmon',
            cgccpf: $scope.regSelecPassagens[0].cgccpf,
            ptipo: 'cof'
         },
         close: {
            fn: function() {
               $scope.clickConsulta();
               // $scope.clickGrava();
               // $scope.clickBuscaProp('parVei');
            }
         }
      });
   };
   $scope.clickTfcpas = function() {
      //Chamada tfcpas
      Global.addTela({
         codprg: 'tfcpas',
         parEnt: {
            placa:$scope.regSelecPassagens[0].placa
         },
         close: {
            fn: function() {
               //Caso tenha um evento ao sair
            }
         }
      });
   };
   $scope.init();

}]);
