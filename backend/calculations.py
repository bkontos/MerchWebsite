def get_gross_per_item(data):
    gross = 0
    for row in data:
        count_in = row['countIn']
        count_out = row['countOut']
        comps = row['comps']
        price = row['price']
        gross = (count_in - comps - count_out) * price
        return gross

def get_total_gross(data):
    total_gross = 0
    for row in data:
        count_in = row['countIn']
        count_out = row['countOut']
        comps = row['comps']
        price = row['price']
        gross = (count_in - comps - count_out) * price
        total_gross += gross
    return total_gross

def get_soft_gross(data):
    soft_gross = 0
    for row in data:
        if not row['isHard']:
            count_in = row['countIn']
            count_out = row['countOut']
            comps = row['comps']
            price = row['price']
            gross = (count_in - comps - count_out) * price
            soft_gross += gross
    return soft_gross

def get_hard_gross(data):
    hard_gross = 0
    for row in data:
        if not row['isHard']:
            count_in = row['countIn']
            count_out = row['countOut']
            comps = row['comps']
            price = row['price']
            gross = (count_in - comps - count_out) * price
            hard_gross += gross
    return hard_gross

def get_soft_net(data):
    soft_net = 0
    
    return soft_net

def get_hard_net(data):
    hard_net = 0
    return hard_net

def get_casino_owed_soft(data):
    casino_owed_soft = 0
    return casino_owed_soft

def get_casino_owed_hard(data):
    casino_owed_hard = 0
    return casino_owed_hard

def get_total_casino_owed(data):
    total_casino_owed = 0
    return total_casino_owed

def get_band_revenue(data):
    band_revenue = 0
    return band_revenue