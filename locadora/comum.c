#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int codcliente;
    char nome[100];
    char endereco[100];
    char telefone[15];
} CLIENTE;

typedef struct {
    int codveiculo;
    char descricao[100];
    char modelo[100];
    char cor[100];
    char placa[30];
    float valor_diaria;
    int qtdocupantes;
    char status[30];
} VEICULO;

typedef struct {
    int codlocacao;
    char data_retirada[11];
    char data_devolucao[11];
    float seguro;
    int qtddias;
    int codcliente;
    int codveiculo;
} LOCACAO;

int DatDif(int,int,int,int,int,int);
int IsValid(int,int,int);
void imprimir_cliente(CLIENTE);
int qtd_pontos(int);
void listar_locacoes(int);


void esperar() {
    printf("\nPRESSIONE <ENTER> para continuar...\n");
    getchar();
}

void trocar_caractere(char *texto, char de, char para)
{
    int i;
    for (i=0;i<strlen(texto);i++)
    {
        if(texto[i]==de)
            texto[i] = para;
    }
}

void obter_texto(char *buffer, int max)
{
    fgets(buffer, max, stdin);
    if (buffer[strlen(buffer)-1]=='\n')
        buffer[strlen(buffer)-1] = '\0';
    getchar();
}

int obter_inteiro(int ini, int fim)
{
    // função que retorna um número no intervalo passado
    // enquanto o número não for válido, continua pedindo valores

    int ret = -1;
    do {
        scanf("%i", &ret);
    } while (ret<ini || ret >fim);
    getchar(); // limpar buffer
    return ret;
}


