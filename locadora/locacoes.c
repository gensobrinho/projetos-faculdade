#define ARQLOC "locacoes.txt"
#define VALOR_SEGURO 50

LOCACAO pesquisar_locacao(int codlocacao)
{
    LOCACAO locpesq;
    int achou = 0;
    FILE *arq = fopen(ARQLOC, "r");
    if (arq)
    {
        while(!feof(arq))
        {

            fscanf(arq,"%i %s %s %f %i %i %i\n", &locpesq.codlocacao,
                                                locpesq.data_retirada,
                                                locpesq.data_devolucao,
                                                &locpesq.seguro,
                                                &locpesq.qtddias,
                                                &locpesq.codcliente,
                                                &locpesq.codveiculo);

            if (locpesq.codlocacao==codlocacao)
            {
                achou = 1;
                break;
            }
        }
        fclose(arq);
    }
    if (achou==0)
        locpesq.codlocacao = -1;
    return locpesq;
}

void imprimir_locacao(LOCACAO l)
{
    printf("Código: %i\n", l.codlocacao);
    printf("Data retirada: %s\n", l.data_retirada);
    printf("Data devolução: %s\n", l.data_devolucao);
    printf("Seguro: %f\n", l.seguro);
    printf("Qtd. dias: %i\n", l.qtddias);
    printf("Cliente: %i\n", l.codcliente);
    printf("Veículo: %i\n", l.codveiculo);
}

void listar_locacao()
{
    int codcliente;
    CLIENTE clipesq;

    printf("\n\nPESQUISAR LOCAÇÃO\n\n");

    printf("Código do cliente: ");
    codcliente = obter_inteiro(1, 30000);
    clipesq = pesquisar_cliente(codcliente);

    if (clipesq.codcliente!=-1)
    {
       listar_locacoes(clipesq.codcliente);
    }
    else
    {
        printf("Código não encontrado\n");
        esperar();
    }
}

void listar_locacoes(int codcliente)
{
    LOCACAO locpesq;
    FILE *arq = fopen(ARQLOC, "r");

    printf("\n\nLISTAGEM DE LOCAÇÕES\n\n");

    if (arq)
    {
        while(!feof(arq))
        {

            fscanf(arq,"%i %s %s %f %i %i %i\n", &locpesq.codlocacao,
                                                locpesq.data_retirada,
                                                locpesq.data_devolucao,
                                                &locpesq.seguro,
                                                &locpesq.qtddias,
                                                &locpesq.codcliente,
                                                &locpesq.codveiculo);

            if (codcliente==0)
            {
                imprimir_locacao(locpesq);
                printf("\n");
            }
            else
                if (codcliente==locpesq.codcliente)
                {
                    imprimir_locacao(locpesq);
                    printf("\n");
                }

        }
        fclose(arq);
    }
    else
    {
        printf("Nenhum registro encontrado\n");
    }

    esperar();
}

void cadastrar_locacao()
{
    FILE *arq;
    LOCACAO locpesq, locnovo;
    CLIENTE clipesq;
    VEICULO veipesq;
    char resp;
    int qtdocupantes;

    printf("\n\nCADASTRAR LOCAÇÃO\n\n");
    printf("Código: ");
    do {
        locnovo.codlocacao = obter_inteiro(1,30000);
        locpesq = pesquisar_locacao(locnovo.codlocacao);
        if (locpesq.codlocacao==-1)
        {

            do {
                do {
                    printf("Data de retirada: ");
                    obter_texto(locnovo.data_retirada, 11);
                } while (!IsValidDate(locnovo.data_retirada));

                do {
                    printf("Data de devolução: ");
                    obter_texto(locnovo.data_devolucao, 11);
                } while (!IsValidDate(locnovo.data_devolucao));

                locnovo.qtddias = DataDiferenca(locnovo.data_retirada, locnovo.data_devolucao) + 1;
                printf("Qtd. dias: %i\n", locnovo.qtddias);

            } while (locnovo.qtddias<1);

            printf("Contratar Seguro (R$ 50,00) - [S/N]: ");
            scanf("%c", &resp);
            if (resp=='S')
                locnovo.seguro = VALOR_SEGURO;
            else
                locnovo.seguro = 0;

            do {
                printf("Código do cliente: ");
                locnovo.codcliente = obter_inteiro(1, 30000);
                clipesq = pesquisar_cliente(locnovo.codcliente);
            } while (clipesq.codcliente==-1);

            printf("Qtd. ocupantes: ");
            qtdocupantes = obter_inteiro(1,50);

            veipesq = buscar_veiculo_disponivel(qtdocupantes);

            if (veipesq.codveiculo!=-1)
            {
                locnovo.codveiculo = veipesq.codveiculo;

                printf("\nVeículo encontrado\n");
                imprimir_veiculo(veipesq);
                printf("\n");

                mudar_status(locnovo.codveiculo, "ALUGADO");

                arq = fopen(ARQLOC, "a+");
                fprintf(arq,"%i %s %s %f %i %i %i\n", locnovo.codlocacao,
                                                    locnovo.data_retirada,
                                                    locnovo.data_devolucao,
                                                    locnovo.seguro,
                                                    locnovo.qtddias,
                                                    locnovo.codcliente,
                                                    locnovo.codveiculo);
                fclose(arq);
                printf("\nCadastrado com sucesso!\n");
            }
            else
            {
                printf("\nNenhum veículo disponível para aluguel!\n");
            }
            locpesq.codlocacao = 0; // para sair do loop


        }
        else
        {
            printf("Código já existente!\n");
        }
    } while(locpesq.codlocacao==-1);

    esperar();
}

void baixar_locacao()
{
    int codlocacao, qtddias;
    float multa, total_locacao, total_geral;
    LOCACAO locpesq;
    VEICULO veipesq;
    char data_entrega[11];

    printf("\n\nBAIXAR LOCAÇÃO\n\n");

    printf("Código da locação: ");
    codlocacao = obter_inteiro(1, 30000);
    locpesq = pesquisar_locacao(codlocacao);

    if (locpesq.codlocacao!=-1)
    {
        imprimir_locacao(locpesq);

        veipesq = pesquisar_veiculo(locpesq.codveiculo);

        do
        {
            do {
                printf("Data da entrega: ");
                obter_texto(data_entrega, 11);
            } while (!IsValidDate(data_entrega));

            qtddias = DataDiferenca(locpesq.data_retirada, data_entrega) + 1;

        } while (qtddias<1);

        total_locacao = veipesq.valor_diaria * qtddias;

        multa = 0;
        if (qtddias>locpesq.qtddias)
        {
            multa = total_locacao*0.05 + (qtddias - locpesq.qtddias)*30;
        }

        total_geral = total_locacao + multa;

        printf("\n");
        printf("Total de dias previstos: %i\n", locpesq.qtddias);
        printf("Total de dias usados: %i\n\n", qtddias);
        printf("Valor da diária: %.2f\n", veipesq.valor_diaria);
        printf("Valor do aluguel: %.2f\n", total_locacao);
        printf("Valor da multa: %.2f\n\n", multa);
        printf("Total a pagar: %.2f\n", total_geral);

        mudar_status(veipesq.codveiculo, "DISPONIVEL");

    }
    else
    {
        printf("Código não encontrado\n");
    }
    esperar();
}


/*
Implemente uma função que calcule a quantidade de pontos de fidelidade de um cliente.
Para cada dia de locação, o cliente ganhará 10 pontos no programa de fidelidade.
*/

int qtd_pontos(int codcliente)
{
    int qtdpontos = 0;
    LOCACAO locpesq;
    FILE *arq = fopen(ARQLOC, "r");

    if (arq)
    {
        while(!feof(arq))
        {

            fscanf(arq,"%i %s %s %f %i %i %i\n", &locpesq.codlocacao,
                                                locpesq.data_retirada,
                                                locpesq.data_devolucao,
                                                &locpesq.seguro,
                                                &locpesq.qtddias,
                                                &locpesq.codcliente,
                                                &locpesq.codveiculo);

            if (codcliente==locpesq.codcliente)
            {
                qtdpontos += locpesq.qtddias * 10;
            }

        }
        fclose(arq);
    }
    return qtdpontos;
}


/*
Implemente uma função extra, criada pelo grupo. Sejam criativos!
*/
void calcular_faturamento_mes()
{
    int mes, ano;
    LOCACAO locpesq;
    VEICULO veipesq;
    float total = 0;
    FILE *arq = fopen(ARQLOC, "r");


    printf("\n\nFATURAMENTO MENSAL\n\n");

    printf("Informe o ano desejado: ");
    ano = obter_inteiro(1970, 3000);

    printf("Informe o mes desejado: ");
    mes = obter_inteiro(1, 12);

    if (arq)
    {
        while(!feof(arq))
        {

            fscanf(arq,"%i %s %s %f %i %i %i\n", &locpesq.codlocacao,
                                                locpesq.data_retirada,
                                                locpesq.data_devolucao,
                                                &locpesq.seguro,
                                                &locpesq.qtddias,
                                                &locpesq.codcliente,
                                                &locpesq.codveiculo);

            if (getMes(locpesq.data_devolucao)==mes)
            {
                if (getAno(locpesq.data_devolucao)==ano)
                {
                    veipesq = pesquisar_veiculo(locpesq.codveiculo);
                    total += locpesq.qtddias * veipesq.valor_diaria;
                }
            }
        }
        fclose(arq);

        printf("Faturamento total do mês: R$ %.2f\n", total);
    }
    else
    {
        printf("Nenhum registro encontrado\n");
    }

    esperar();
}
