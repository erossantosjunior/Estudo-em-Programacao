from flask import Flask, render_template, request, redirect, url_for
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Simulando banco de dados na memória
data = {
    "despesas_fixas": [],
    "investimentos": [],
    "fontes_renda": []
}
 
@app.route('/')
def index():
     # Cálculos
    total_receitas = sum(item['valor'] for item in data["fontes_renda"])
    total_despesas = sum(item['valor'] for item in data["despesas_fixas"])
    total_investimentos = sum(item['valor'] for item in data["investimentos"])

    media_ganhos_mensal = total_receitas / 12 if total_receitas else 0
    media_ganhos_anual = total_receitas
    media_despesas_mensal = total_despesas / 12 if total_despesas else 0
    media_despesas_anual = total_despesas

    return render_template(
        'index.html', 
        data=data, 
        total_receitas=total_receitas,
        total_despesas=total_despesas,
        total_investimentos=total_investimentos,
        media_ganhos_mensal=media_ganhos_mensal,
        media_ganhos_anual=media_ganhos_anual,
        media_despesas_mensal=media_despesas_mensal,
        media_despesas_anual=media_despesas_anual
    )

@app.route('/add/<category>', methods=['POST'])
def add_item(category):
    item = request.form.get('item')
    valor = request.form.get('valor')
    if item and valor:
        data[category].append({"item": item, "valor": float(valor)})
    return redirect(url_for('index'))

@app.route('/statusinvest/<stock>')
def status_invest(stock):
    # Exemplo de integração básica com scraping (use a API oficial se disponível)
    url = f'https://statusinvest.com.br/acoes/{stock}'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Captura de alguns dados básicos
    try:
        ticker = soup.find("h1", {"class": "value"}).text.strip()
        price = soup.find("div", {"class": "info"}).find("strong").text.strip()
        return f"Ação: {ticker}, Preço atual: R${price}"
    except Exception as e:
        return f"Erro ao buscar dados para {stock}: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
