#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>

#include "comum.c"
#include "datefunc.c"
#include "clientes.c"
#include "veiculos.c"
#include "locacoes.c"
#define SAIR 13


void mostrar_menu()
{
    printf("SISTEMA PARA CONTROLE DE LOCAÇÕES DE VEÍCULOS\n\n");
    printf("CLIENTES\t 1) Cadastrar\n");
    printf("        \t 2) Pesquisar\n");
    printf("        \t 3) Listar\n");
    printf("        \t 4) Listar ganhadores do LocaMais\n\n");
    printf("VEÍCULOS\t 5) Cadastrar\n");
    printf("        \t 6) Pesquisar\n");
    printf("        \t 7) Listar\n\n");
    printf("LOCAÇÃO \t 8) Cadastrar\n");
    printf("        \t 9) Listar\n");
    printf("        \t10) Pesquisar por cliente\n");
    printf("        \t11) Baixar\n");
    printf("        \t12) Calcular faturamento por mês\n\n");
    printf("OUTROS  \t13) Sair\n\n");
}

int main()
{
    int opcao=0;

    setlocale("",LC_ALL);

    while(opcao!=SAIR)
    {
        mostrar_menu();

        printf("Entre com a opção desejada: ");
        opcao = obter_inteiro(1,SAIR);

        switch(opcao)
        {
            case 1:
                cadastrar_cliente();
                break;
            case 2:
                listar_cliente();
                break;
            case 3:
                listar_clientes();
                break;
            case 4:
                listar_clientes_locamais();
                break;
            case 5:
                cadastrar_veiculo();
                break;
            case 6:
                listar_veiculo();
                break;
            case 7:
                listar_veiculos();
                break;
            case 8:
                cadastrar_locacao();
                break;
            case 9:
                listar_locacoes(0);
                break;
            case 10:
                listar_locacao();
                break;
            case 11:
                baixar_locacao();
                break;
            case 12:
                calcular_faturamento_mes();
                break;
            default:
                // faz "nada", pq informou que quer sair
                break;
        }
    }
    return 0;
}
