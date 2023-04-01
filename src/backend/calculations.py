tax = 1.063
se_fee = 95
ccFee = 20
soft_percentage = .2
hard_percentage = .1
"""
def get_gross_per_item(data):
    gross_per_item = 0
    for row in data:
        countIn = row['countIn']
        countOut = row['countOut']
        comps = row['comps']
        price = row['price']
        gross_per_item = (countIn - comps - countOut) * price
        return gross_per_item
"""

def get_total_gross(data):
    total_gross = 0
    gross = 0
    for row in data:
        countIn = row['countIn']
        countOut = row['countOut']
        comps = row['comps']
        price = row['price']
        gross = (float(countIn) - float(comps) - float(countOut)) * float(price)
        total_gross += gross
    return total_gross

def get_soft_gross(data):
    soft_gross = 0
    gross = 0
    for row in data:
        if not row['isHard']:
            countIn = row['countIn']
            countOut = row['countOut']
            comps = row['comps']
            price = row['price']
            gross = (float(countIn) - float(comps) - float(countOut)) * float(price)
            soft_gross += gross
    return soft_gross

def get_hard_gross(data):
    hard_gross = 0
    gross = 0
    for row in data:
        if row['isHard']:
            countIn = row['countIn']
            countOut = row['countOut']
            comps = row['comps']
            price = row['price']
            gross = (float(countIn) - float(comps) - float(countOut)) * float(price)
            hard_gross += gross
    return hard_gross

def get_soft_net(data):
    soft_net = 0
    soft_net = (get_soft_gross(data)/tax) - ccFee - se_fee
    return soft_net

def get_hard_net(data):
    hard_net = 0
    hard_net = (get_hard_gross(data)/tax)
    return hard_net

def get_casino_owed_soft(data):
    casino_owed_soft = 0
    casino_owed_soft = get_soft_net(data) * soft_percentage
    return casino_owed_soft

def get_casino_owed_hard(data):
    casino_owed_hard = 0
    casino_owed_hard = get_hard_net(data) * hard_percentage
    return casino_owed_hard

def get_total_casino_owed(data):
    total_casino_owed = 0
    total_casino_owed = get_casino_owed_soft(data) + get_casino_owed_hard(data) + se_fee
    return total_casino_owed

def get_band_revenue(data):
    band_revenue = 0
    band_revenue = get_total_gross(data) / tax - get_total_casino_owed(data)
    return band_revenue