#include <stdio.h>
#include <string.h>

int main()
{
    char nome[100];
    printf("Informe: ");
    fgets(nome, 99, stdin);
    printf("%s\n\n", nome);
    return 0;
}
