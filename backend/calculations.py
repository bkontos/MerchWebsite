"""from flask import make_response
import xlsxwriter
import json

@app.route('/api/save-data', methods=['POST'])
def save_data(data):
    # Save the data to a file
    ...

    # Generate the Excel file
    workbook = xlsxwriter.Workbook('data.xlsx')
    worksheet = workbook.add_worksheet()

    # Write the data to the Excel file
    row = 0
    for item in data:
        worksheet.write(row, 0, item['name'])
        worksheet.write(row, 1, item ['size'])
        worksheet.write(row, 2, item ['price'])
        worksheet.write(row, 3, item['countIn'])
        worksheet.write(row, 4, item['countOut'])
        worksheet.write(row, 5, item['comps'])
        worksheet.write(row, 6, item['isHard'])
        row += 1

    workbook.close()

    # Return the Excel file as a response
    with open('data.xlsx', 'rb') as f:
        file_data = f.read()

    response = make_response(file_data)
    response.headers['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    response.headers['Content-Disposition'] = 'attachment; filename=data.xlsx'

    return response"""