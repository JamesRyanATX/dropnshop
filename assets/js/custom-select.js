$(document).ready(function () {
    enableSelectBoxes();
    multiplePrintOptions();
});

function enableSelectBoxes() {
    $('div.selectBox').each(function () {
        $(this).children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
        $(this).attr('value', $(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));

        $(this).children('span.selected,span.selectArrow').on('click', function () {
            if ($(this).parent().children('div.selectOptions').css('display') == 'none') {
                $(this).parent().children('div.selectOptions').css('display', 'block');
            }
            else {
                $(this).parent().children('div.selectOptions').css('display', 'none');
            }
        });

        $(this).find('span.selectOption').on('click', function () {
            $(this).parent().css('display', 'none');
            $(this).closest('div.selectBox').attr('value', $(this).attr('value'));
            $(this).parent().siblings('span.selected').html($(this).html());
        });
    });
}

function multiplePrintOptions() {
    // Logic for Print Count
    $('div.printCountBox').each(function () {
        $(this).children('span.printCount').html($(this).children('div.printOptions').children('span.printOption:first').html());
        $(this).attr('value', $(this).children('div.printOptions').children('span.printOption:first').attr('value'));

        $(this).children('span.printCount, span.printBoxArrow').on('click', function () {
            if ($(this).parent().children('div.printOptions').css('display') == 'none') {
                $(this).parent().children('div.printOptions').css('display', 'block');
            }
            else {
                $(this).parent().children('div.printOptions').css('display', 'none');
            }
        });

        $(this).find('span.printOption').on('click', function () {
            $(this).parent().css('display', 'none');
            $(this).closest('div.printCountBox').attr('value', $(this).attr('value'));
            $(this).parent().siblings('span.printCount').html($(this).html());
            if(onCustomSelectOptionClick()){
                onCustomSelectOptionClick();
            }
        });
    });
    // End of Print Count logic
}