#define ARQVEI "veiculos.txt"
#define ARQVEI_TMP "veiculos_tmp.txt"

void trocar_caractere_veiculo(VEICULO *v, char de, char para)
{
    trocar_caractere(v->descricao, de, para);
    trocar_caractere(v->modelo, de, para);
    trocar_caractere(v->cor, de, para);
    trocar_caractere(v->placa, de, para);
    trocar_caractere(v->status, de, para);
}

VEICULO pesquisar_veiculo(int codveiculo)
{
    VEICULO veipesq;
    int achou = 0;
    FILE *arq = fopen(ARQVEI, "r");
    if (arq)
    {
        while(!feof(arq))
        {
            fscanf(arq,"%i %s %s %s %s %f %i %s\n", &veipesq.codveiculo,
                                                    veipesq.descricao,
                                                    veipesq.modelo,
                                                    veipesq.cor,
                                                    veipesq.placa,
                                                    &veipesq.valor_diaria,
                                                    &veipesq.qtdocupantes,
                                                    veipesq.status);

            trocar_caractere_veiculo(&veipesq, ' ', '+');

            if (veipesq.codveiculo==codveiculo)
            {
                achou = 1;
                break;
            }
        }
        fclose(arq);
    }

    if (achou==0)
        veipesq.codveiculo = -1;

    return veipesq;
}

void imprimir_veiculo(VEICULO v)
{
    printf("Código: %i\n", v.codveiculo);
    printf("Descrição: %s\n", v.descricao);
    printf("Modelo: %s\n", v.modelo);
    printf("Cor: %s\n", v.cor);
    printf("Placa: %s\n", v.placa);
    printf("Diária: %.2f\n", v.valor_diaria);
    printf("Qtd. Ocupantes: %i\n", v.qtdocupantes);
    printf("Status: %s\n", v.status);
}

void listar_veiculo()
{
    int codveiculo;
    VEICULO veipesq;

    printf("\n\nPESQUISAR VEÍCULO\n\n");

    printf("Código do veículo: ");
    codveiculo = obter_inteiro(1, 30000);
    veipesq = pesquisar_veiculo(codveiculo);

    if (veipesq.codveiculo!=-1)
    {
        trocar_caractere_veiculo(&veipesq, '+', ' ');
        imprimir_veiculo(veipesq);
    }
    else
        printf("Código não encontrado\n");

    esperar();
}

void listar_veiculos()
{
    printf("\n\nLISTAGEM DE VEÍCULOS\n\n");

    VEICULO veipesq;
    FILE *arq = fopen(ARQVEI, "r");

    if (arq)
    {
        while(!feof(arq))
        {
            fscanf(arq,"%i %s %s %s %s %f %i %s\n", &veipesq.codveiculo,
                                                    veipesq.descricao,
                                                    veipesq.modelo,
                                                    veipesq.cor,
                                                    veipesq.placa,
                                                    &veipesq.valor_diaria,
                                                    &veipesq.qtdocupantes,
                                                    veipesq.status);

            trocar_caractere_veiculo(&veipesq, '+', ' ');

            imprimir_veiculo(veipesq);
            printf("\n");
        }
        fclose(arq);
    }
    else
    {
        printf("Nenhum registro encontrado\n");
    }

    esperar();
}

void cadastrar_veiculo()
{
    FILE *arq;
    VEICULO veinovo, veipesq;
    printf("\n\nCADASTRAR VEÍCULO\n\n");
    printf("Código: ");
    do {
        veinovo.codveiculo = obter_inteiro(1,30000);
        veipesq = pesquisar_veiculo(veinovo.codveiculo);
        if (veipesq.codveiculo==-1)
        {

            printf("Descrição: ");
            obter_texto(veinovo.descricao, 99);

            printf("Modelo: ");
            obter_texto(veinovo.modelo, 99);

            printf("Cor: ");
            obter_texto(veinovo.cor, 99);

            printf("Placa: ");
            obter_texto(veinovo.placa, 29);

            printf("Valor diária: ");
            scanf("%f", &veinovo.valor_diaria);

            printf("Qtd. ocupantes: ");
            veinovo.qtdocupantes = obter_inteiro(1,50);

            strcpy(veinovo.status, "DISPONIVEL");

            trocar_caractere_veiculo(&veinovo, ' ', '+');

            arq = fopen(ARQVEI, "a+");
            fprintf(arq, "%i %s %s %s %s %f %i %s\n", veinovo.codveiculo,
                                                    veinovo.descricao,
                                                    veinovo.modelo,
                                                    veinovo.cor,
                                                    veinovo.placa,
                                                    veinovo.valor_diaria,
                                                    veinovo.qtdocupantes,
                                                    veinovo.status);
            fclose(arq);

            veipesq.codveiculo = 0; // para sair do loop

            printf("\nCadastrado com sucesso!\n");
        }
        else
        {
            printf("Código já existente!\n");
        }
    } while(veipesq.codveiculo==-1);

    esperar();
}

void mudar_status(int codveiculo, char *status)
{
    VEICULO veipesq;
    FILE *arqorigem = fopen(ARQVEI, "r");
    FILE *arqdestino = fopen(ARQVEI_TMP, "w");

    if (arqorigem)
    {
        while(!feof(arqorigem))
        {
            fscanf(arqorigem,"%i %s %s %s %s %f %i %s\n", &veipesq.codveiculo,
                                                    veipesq.descricao,
                                                    veipesq.modelo,
                                                    veipesq.cor,
                                                    veipesq.placa,
                                                    &veipesq.valor_diaria,
                                                    &veipesq.qtdocupantes,
                                                    veipesq.status);
            if (veipesq.codveiculo == codveiculo)
            {
                strcpy(veipesq.status, status);
            }
            fprintf(arqdestino, "%i %s %s %s %s %f %i %s\n", veipesq.codveiculo,
                                                veipesq.descricao,
                                                veipesq.modelo,
                                                veipesq.cor,
                                                veipesq.placa,
                                                veipesq.valor_diaria,
                                                veipesq.qtdocupantes,
                                                veipesq.status);
        }
        fclose(arqorigem);
        fclose(arqdestino);

        // -----------------------------------------------------
        // devolvendo para o arquivo original
        FILE *arqorigem = fopen(ARQVEI_TMP, "r");
        FILE *arqdestino = fopen(ARQVEI, "w");
        while(!feof(arqorigem))
        {
            fscanf(arqorigem,"%i %s %s %s %s %f %i %s\n", &veipesq.codveiculo,
                                                    veipesq.descricao,
                                                    veipesq.modelo,
                                                    veipesq.cor,
                                                    veipesq.placa,
                                                    &veipesq.valor_diaria,
                                                    &veipesq.qtdocupantes,
                                                    veipesq.status);
            fprintf(arqdestino, "%i %s %s %s %s %f %i %s\n", veipesq.codveiculo,
                                                veipesq.descricao,
                                                veipesq.modelo,
                                                veipesq.cor,
                                                veipesq.placa,
                                                veipesq.valor_diaria,
                                                veipesq.qtdocupantes,
                                                veipesq.status);
        }
        fclose(arqorigem);
        fclose(arqdestino);
        // -----------------------------------------------------
    }

}

VEICULO buscar_veiculo_disponivel(int qtdocupantes)
{
    VEICULO veipesq;
    FILE *arq = fopen(ARQVEI, "r");
    int achou = 0;

    if (arq)
    {
        while(!feof(arq))
        {
            fscanf(arq,"%i %s %s %s %s %f %i %s\n", &veipesq.codveiculo,
                                                    veipesq.descricao,
                                                    veipesq.modelo,
                                                    veipesq.cor,
                                                    veipesq.placa,
                                                    &veipesq.valor_diaria,
                                                    &veipesq.qtdocupantes,
                                                    veipesq.status);

            trocar_caractere_veiculo(&veipesq, '+', ' ');

            if (strcmp(veipesq.status, "LIVRE")==0)
            {
                if (qtdocupantes<=veipesq.qtdocupantes)
                {
                    achou = 1;
                    break;
                }
            }

        }
        fclose(arq);
    }

    if (achou==0)
        veipesq.codveiculo = -1;

    return veipesq;
}
