var cVazio = "vazio",
    cJogador1 = "jogador1",
    cJogador2 = "jogador2",
    jogadorAtual = 1,
    fim = 0, //-1 = Velha; 0 = Normal; 1 = Jog1 venceu; 2 = Jog2 venceu;
    tabuleiro = [
        [cVazio, cVazio, cVazio],
        [cVazio, cVazio, cVazio],
        [cVazio, cVazio, cVazio]
    ];

function verificarLinhas(){
    Loop1:
    for (var r = 0; r < 3; r++){
        var primeiro = tabuleiro[r][0];
        if (primeiro == cVazio)
            continue;
        else
            for(var c = 0; c <3; c++)
                if (tabuleiro[r][c] != primeiro)
                    continue Loop1;
            return r;
    }
    return -1;
}

function verificarColunas(){
    Loop1:
    for (var c = 0; c < 3; c++){
        var primeiro = tabuleiro[0][c];
        if (primeiro == cVazio)
            continue;
        else
            for(var r = 0; r <3; r++)
                if (tabuleiro[r][c] != primeiro)
                    continue Loop1;
            return c;
    }
    return -1;
}

function verificarVelha(){
    var velha = 0;
    for(var i = 0; i < 3; i++)    
        if (tabuleiro[i].every(function filtro(elem, ind, obj){            
            return (elem != cVazio);
        }))
            velha++;
    return (velha == 3);
}

function verificarTabuleiro(){
    if (verificarLinhas() > -1 || verificarColunas() > -1)
        fim = jogadorAtual;
    else if (verificarVelha())
        fim = -1;
    return fim;

}

function trocarJogador(){
    if (jogadorAtual == 1)
        jogadorAtual = 2;
    else 
        jogadorAtual = 1;
    document.getElementById("jogador").innerHTML = "Jogador "+jogadorAtual+" é a sua vez!";
}

function preencherTabuleiro(cel){
    var row = cel.getAttribute("data-linha"),
        col = cel.getAttribute("data-coluna");
    if (jogadorAtual == 1)
        tabuleiro[row][col] = cJogador1;
    else        
        tabuleiro[row][col] = cJogador2;
}

function celulaClick(){
    if (fim != 0)
        return;
    if (this.className == cVazio){
        if (jogadorAtual == 1){
            this.className = cJogador1;
            this.innerHTML = "X";
        }
        else{
            this.className = cJogador2;
            this.innerHTML = "O";
        }
        preencherTabuleiro(this);
        debugger;
        verificarTabuleiro();
        if (fim == -1){
            document.getElementById("jogador").innerHTML = "Jogo finalizado, pois deu velha!";
            document.getElementById("btnReiniciar").style.visibility = "visible";
        }
        else if (fim == 0)
            trocarJogador();
        else
            document.getElementById("jogador").innerHTML = "Jogador "+fim+" é o vencedor!";
            
    }
    else if (this.className == cJogador1)
        alert("Jogador 1 já selecionou esse local!");
    else if (this.className == cJogador2)
        alert("Jogador 2 já selecionou esse local!");
}

function btnReiniciarClick(){
    alert("this.id");
}

function carregarCelula(cel){
    cel.onclick = celulaClick;
    cel.className = cVazio;
}

window.onload = function(){
    var celulas = document.getElementsByTagName("td");
    for(var index in celulas){
        var cel = celulas[index];
        carregarCelula(cel); 
    }
    
    var btnReiniciar = document.getElementById("btnReiniciar");
    btnReiniciar.onclick = btnReiniciarClick;
    document.getElementById("btnReiniciar").style.visibility = "hidden";
}