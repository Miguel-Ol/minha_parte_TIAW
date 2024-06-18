function leDados() {
  let strDados = localStorage.getItem('db');
  let objDados = {};

  if (strDados) {
    objDados = JSON.parse(strDados);
  }
  else {
    //formato no qual estou armazenando as questões
    objDados = {
      dificuldades: [
        {
          fácil: [
            {
              id: 1,
              texto: "qual destes tipos de variável aceita um texto?",
              resp: ["string", "byte", "int", "double"]//,
              //vouf: ["true","false","false","false"]
            }
          ]
        }
      ]
    }
  }

  return objDados;
}

//funções de armazenar o texto no local storage
function incluirQuest() {
  let objDados = leDados();

  let perg = document.getElementById('InputPerg').value;
  let resp1 = document.getElementById('InputQuest1').value;
  let resp2 = document.getElementById('InputQuest2').value;
  let resp3 = document.getElementById('InputQuest3').value;
  let resp4 = document.getElementById('InputQuest4').value;

  let novaperg = {
    texto: perg,
    resp: [resp1, resp2, resp3, resp4]
  };

  objDados.dificuldades[0].fácil.push(novaperg);

  salvaDados(objDados);
  imprimeDados();
}


function salvaDados(dados) {
  localStorage.setItem('db', JSON.stringify(dados));
  console.log(localStorage.getItem('db'));
}

function imprimeDados() {
  let tela = document.getElementById('EspQuests');
  let strHtml = '';
  let objDados = leDados();

  //após uma questão ser confirmada a criação, esse será seu escopo
  for (let i = 0; i < objDados.dificuldades[0].fácil.length; i++) {
      strHtml += `<div class="questão${[i]} border-bottom mt-2">
      <div class="d-flex col">
          <button id="BtnDelQuest${[i]}"><img src="../assets/images/trash_red.png" class="" alt="" width="35"
                  height="auto"></button>
          <div class="fs-3 ms-2 d-flex justify-content-between">
              <h2 class="mt-1">${objDados.dificuldades[0].fácil[i].texto}</h2>
              <button id="BtnEditarPerg${[i]}" class="ms-2"><img src="../assets/images/iconizer-botao-editar.svg" class=""
                      alt="" width="40" height="40"></button>
          </div>
      </div>
      <ul>
          <li class="d-flex"><button id="editrespind1${i}"><img src="../assets/images/circle2.png"
                      class="editarResp me-2 mb-3"id="BtnEditarResp1${[i]}" alt=""></button>
              <p id="respp1${i}">${objDados.dificuldades[0].fácil[i].resp[0]}</p>
          </li>
          <li class="d-flex"><button id="editrespind2${i}"><img src="../assets/images/circle2.png"
                      class="editarResp me-2 mb-3"id="BtnEditarResp2${[i]}" alt=""></button>
              <p id="respp2${i}">${objDados.dificuldades[0].fácil[i].resp[1]}</p>
          </li>
          <li class="d-flex"><button id="editrespind3${i}"><img src="../assets/images/circle2.png"
                      class="editarResp me-2 mb-3"id="BtnEditarResp3${[i]}" alt=""></button>
              <p id="respp3${i}">${objDados.dificuldades[0].fácil[i].resp[2]}</p>
          </li>
          <li class="d-flex"><button id="editrespind4${i}"><img src="../assets/images/circle2.png"
                      class="editarResp me-2 mb-3"id="BtnEditarResp4${[i]}" alt=""></button>
              <p id="respp4${i}">${objDados.dificuldades[0].fácil[i].resp[3]}<p>
          </li>
      </ul>
  </div>`
  }
  tela.innerHTML = strHtml;
  document.getElementById('InputPerg').value = '';
  document.getElementById('InputQuest1').value = '';
  document.getElementById('InputQuest2').value = '';
  document.getElementById('InputQuest3').value = '';
  document.getElementById('InputQuest4').value = '';

//comando de deletar questões
  for (let i = 0; i < objDados.dificuldades[0].fácil.length; i++) {
    document.getElementById(`BtnDelQuest${i}`).addEventListener('click', function() {
        let questao = document.querySelector(`.questão${i}`);
        questao.remove();

        objDados.dificuldades[0].fácil.splice(i, 1);

        salvaDados(objDados);

        location.reload();
    });

    //comando de edição de questão
document.getElementById(`BtnEditarPerg${[i]}`).addEventListener('click', function() {
  let questao = document.querySelector(`.questão${i}`);
  let div = document.getElementById("TelaAddQuest");
  let addbtn = document.getElementById("BtnAddQuestArea");
  let inc = document.getElementById("cancelarea");

  let texto = objDados.dificuldades[0].fácil[i].texto;
  let resp0 = objDados.dificuldades[0].fácil[i].resp[0];
  let resp1 = objDados.dificuldades[0].fácil[i].resp[1];
  let resp2 = objDados.dificuldades[0].fácil[i].resp[2];
  let resp3 = objDados.dificuldades[0].fácil[i].resp[3];

  questao.remove();
  objDados.dificuldades[0].fácil.splice(i, 1);

  if (div.style.display === "none") {
    div.style.display = "block";
    addbtn.style.display = "none";
  }
  if(inc.style.display === "block")
  inc.style.display = "none";

  document.getElementById('InputPerg').value = texto;
  document.getElementById('InputQuest1').value = resp0;
  document.getElementById('InputQuest2').value = resp1;
  document.getElementById('InputQuest3').value = resp2;
  document.getElementById('InputQuest4').value = resp3;
  salvaDados(objDados);
});
  
    }
    
    
}





window.addEventListener('load', imprimeDados);
document.getElementById('BtnConfQuest').addEventListener('click', incluirQuest);



//comando para a aparição do campo de cadastro de questão
document.getElementById("BtnAddQuest").addEventListener("click", function () {
  var div = document.getElementById("TelaAddQuest");
  var addbtn = document.getElementById("BtnAddQuestArea");
  var cancbtn = document.getElementById("cancelarea");

  if (div.style.display === "none") {
    div.style.display = "block";
    addbtn.style.display = "none";
    cancbtn.style.display = "block";
  } else {
    div.style.display = "none";
    addbtn.style.display = "block";
    cancbtn.style.display = "none";
  }
});

//comando de confirmar a criação de uma questão
document.getElementById("BtnConfQuest").addEventListener("click", function () {
  var div = document.getElementById("TelaAddQuest");
  var addbtn = document.getElementById("BtnAddQuestArea");
  if (div.style.display === "none") {
    div.style.display = "block";
    addbtn.style.display = "none";
  } else {
    div.style.display = "none";
    addbtn.style.display = "block";
  }
});

//comando de cancelar a criação de uma questão
document.getElementById("BtnCancelQuest").addEventListener("click", function () {
  var div = document.getElementById("TelaAddQuest");
  var addbtn = document.getElementById("BtnAddQuestArea");
  if (div.style.display === "none") {
    div.style.display = "block";
    addbtn.style.display = "none";
  } else {
    div.style.display = "none";
    addbtn.style.display = "block";
    document.getElementById('InputPerg').value = '';
    document.getElementById('InputQuest1').value = '';
    document.getElementById('InputQuest2').value = '';
    document.getElementById('InputQuest3').value = '';
    document.getElementById('InputQuest4').value = '';
  }
});

/*document.getElementById("editrespind1").addEventListener("click", function () {
  var delp = document.getElementById("respp1");
  delp.remove();
  let altht = '';
  altht = `<input type="text"
  class="form-control" aria-label="Sizing example input"
  aria-describedby="inputGroup-sizing-sm">`
  this.innerHTML = altht;
});*/


