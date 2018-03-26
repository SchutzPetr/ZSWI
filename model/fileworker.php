<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 06.03.2018
 * Time: 19:35
 */

// Подключаем класс для работы с excel
require './vendor/autoload.php';
include_once("constant.php");
include_once("User.php");


class fileworker
{

    function __construct(){
        @session_start();
    }



    function generateOneReport($month, $year, $arrayData){
		///https://nicknixer.ru/programmirovanie/sozdanie-excel-dokumenta-na-php-generaciya-xls-fajlov/
	    $document = new \PHPExcel();
	    $alphabet = range('A', 'Z');

	    $day = FIRST_DAY;
	    $d = mktime(0, 0, 0, $month, $day, $year);

	    $lastDayInMonth = date("t", strtotime($d));

	    for($index = 0; $index < count($arrayData); $index++) {
		    //////TODO for cycle by users in array
		    $document->createSheet();
		    $sheet = $document->setActiveSheetIndex($index);
		    $sheet->setTitle($arrayData[$index]->nameAndLastName);/// set this
		    $columnPosition = 0;
		    $startLine = 1;

		    // Вставляем заголовок в "A1"
		    $sheet->setCellValueByColumnAndRow($columnPosition, $startLine, 'Evidence odpracované doby:');
		    // Объединяем ячейки "A1:E1"
		    $document->getActiveSheet()->mergeCellsByColumnAndRow($columnPosition, $startLine, array_search('E', $alphabet), $startLine);
		    // Вставляем заголовок в "F1"
		    $sheet->setCellValueByColumnAndRow(array_search('F', $alphabet), $startLine, $arrayData[$index]->nameAndLastName);//$user_data['name']
		    // Объединяем ячейки "F1:K1"
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('F', $alphabet), $startLine, array_search('K', $alphabet), $startLine);
		    // Вставляем заголовок в "L1"
		    $sheet->setCellValueByColumnAndRow(array_search('L', $alphabet), $startLine, "FAV");
		    // Объединяем ячейки "L1:O1"
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('L', $alphabet), $startLine, array_search('O', $alphabet), $startLine);
		    // Вставляем заголовок в "P1"
		    $sheet->setCellValueByColumnAndRow(array_search('P', $alphabet), $startLine, "KIV");
		    // Объединяем ячейки "P1:Q1"
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('P', $alphabet), $startLine,
			    array_search('Q', $alphabet), $startLine);
		    //// Формируем шапку
		    for($i = 0; $i<array_search('R', $alphabet); $i++) {
			    // Красим ячейку
			    $sheet->getStyleByColumnAndRow($i, 1)
			          ->getFill()
			          ->setFillType(\PHPExcel_Style_Fill::FILL_SOLID)
			          ->getStartColor()
			          ->setRGB(COLOR_KIV);
		    }

			// Перекидываем указатель на следующую строку
		    $startLine++;
		    $sheet->setCellValueByColumnAndRow(array_search('A', $alphabet), $startLine, 'Datum');
		    $sheet->setCellValueByColumnAndRow(array_search('B', $alphabet), $startLine, 'Pracovní');
		    $sheet->setCellValueByColumnAndRow(array_search('C', $alphabet), $startLine, 'Typ');
		    $sheet->setCellValueByColumnAndRow(array_search('D', $alphabet), $startLine, 'První část');
			// Объединяем ячейки "D2:F2"
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('D', $alphabet), $startLine, array_search('F', $alphabet), $startLine);
		    $sheet->setCellValueByColumnAndRow(array_search('G', $alphabet), $startLine, 'Přestávka');
			// Объединяем ячейки "G2:I2"
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('G', $alphabet), $startLine, array_search('I', $alphabet), $startLine);
		    $sheet->setCellValueByColumnAndRow(array_search('J', $alphabet), $startLine, 'Druhá část');
			// Объединяем ячейки "J2:L2"
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('J', $alphabet), $startLine, array_search('L', $alphabet), $startLine);
		    $sheet->setCellValueByColumnAndRow(array_search('J', $alphabet), $startLine, 'Třetí část');
			// Объединяем ячейки "M2:O2"
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('M', $alphabet), $startLine, array_search('O', $alphabet), $startLine);
		    $sheet->setCellValueByColumnAndRow(array_search('P', $alphabet), $startLine, 'Nemoc, OČR, Dovolená, Státní svátek');
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('P', $alphabet), $startLine, array_search('P', $alphabet), $startLine+1);
		    $sheet->setCellValueByColumnAndRow(array_search('Q', $alphabet), $startLine, 'Služ. cesta, Práce mimo pracoviště');
		    $document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('Q', $alphabet), $startLine, array_search('Q', $alphabet), $startLine+1);

			// Перекидываем указатель на следующую строку
		    $startLine++;
		    for( $i = 3; $i<array_search('O', $alphabet); $i+=3){
			    $sheet->setCellValueByColumnAndRow($i, $startLine, 'Od');
			    $sheet->setCellValueByColumnAndRow($i+1, $startLine, 'Do');
			    $sheet->setCellValueByColumnAndRow($i+2, $startLine, 'T');
		    }

		    for($day = 1; $day<=$lastDayInMonth; $day++){
			    $sheet->setCellValueByColumnAndRow(array_search('A', $alphabet), $startLine+$day, date("d.m.Y", $d));
			    $d = mktime(0, 0, 0, $month, $day, $year);
		    }

//		    if($arrayData != null){
//			    foreach ($arrayData as $item){
//				    $item["day_of_month"];
//			    }
//		    }

		    $sheet->setCellValueByColumnAndRow(array_search('A', $alphabet), 36, "Evidence ostatních skutečností o náhradních a placených dobách je vedena standardním způsobem");
		    $startLine = 38;
		    $sheet->setCellValueByColumnAndRow(array_search('F', $alphabet), $startLine, "Celkem:");
		    $sheet->setCellValueByColumnAndRow(array_search('I', $alphabet), $startLine, "Name of project 1");
		    $sheet->setCellValueByColumnAndRow(array_search('K', $alphabet), $startLine, "Name of project 2");

		    $startLine= 39;
		    $arrayForTableDownTable  = array("Celkem odpracováno hodin", "Fond prac. doby za státní svátky", "Celkem se státními svátky",
			    "Dovolená přepočtená na hodiny", "Nemocenská, OČR (přepočt. na hod.)", "Celkem k proplacení", "Celkem disponibilní fond bez přestávek");

		    for ($i = 0; $i<count($arrayForTableDownTable); $i++){
			    $sheet->setCellValueByColumnAndRow(array_search('A', $alphabet), $startLine+$i, $arrayForTableDownTable[$i]);
		    }

			///style
		    $border_style= array('borders' => array('allborders' => array('style' =>
			                                                                  PHPExcel_Style_Border::BORDER_MEDIUM,'color' => array('argb' => '000000'),)));


		    $sheet->getStyle("A1:R2")->applyFromArray($border_style);

		    $border_style= array('borders' => array('allborders' => array('style' =>
			                                                                  PHPExcel_Style_Border::BORDER_THIN,'color' => array('argb' => '000000'),)));

		    $sheet->getStyle("A4:Q35")->applyFromArray($border_style);


	    }


	    /****
	     * не было в нужной версии
	     */
// Выводим HTTP-заголовки
//         header ( "Expires: Mon, 1 Apr 1974 05:00:00 GMT" );
//         header ( "Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT" );
//         header ( "Cache-Control: no-cache, must-revalidate" );
//         header ( "Pragma: no-cache" );
//         header ( "Content-type: application/vnd.ms-excel" );
//         header ( "Content-Disposition: attachment; filename=matrix.xls" );

	    /***
	     * конец
	     */

	    $objWriter = \PHPExcel_IOFactory::createWriter($document, 'Excel5');
	    $objWriter->save("testFile.xls");//
	    echo "end";

    }





}