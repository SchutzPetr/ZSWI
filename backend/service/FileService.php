<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 14.06.2018
 * Time: 15:41
 */

include_once(__DIR__ . "/../exception/PermissionException.php");
include_once(__DIR__ . "/../util/Permission.php");
include_once(__DIR__ . "/Service.php");
include_once(__DIR__ . "/UserService.php");
include_once(__DIR__ . "/AttendanceService.php");
include_once(__DIR__ . "/ProjectAssignService.php");
include_once(__DIR__ . "/../model/DayTimeSheet.php");
include_once(__DIR__ . "/../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");
include_once(__DIR__ . "/../api/v1/dto/TimeSheet.php");
include_once (__DIR__."/../vendor/autoload.php");



class FileService extends Service
{


	/***
	 * @param $userId
	 *
	 * @throws PermissionException
	 */
	public static function generateForHoliday($userId){
		$user = UserService::findById($userId);
		if(strpos($user->getMainWorkStation(), "KIV") !== false){
			$number = 52150;
		}else{
			$number = 52250;
		}


		?>
		<<<HTML
		<html>
		<body>
		<table id="t02" style="height: 226px; width: 624px;">
			<tbody>
			<tr style="height: 22px;">
				<td style="width: 457px; height: 22px;" colspan="4">Př&iacute;jmen&iacute;, jm&eacute;no, titul</td>
				<td style="width: 387px; height: 22px;" colspan="3">Osobn&iacute; č&iacute;slo</td>
			</tr>
			<tr style="height: 23px;">
				<td style="width: 457px; height: 23px;" colspan="4"><strong>{$name}</strong></td>
				<td style="width: 387px; height: 23px;" colspan="3">&nbsp;</td>
			</tr>
			<tr style="height: 23px;">
				<td style="width: 105px; height: 23px;">&Uacute;tvar</td>
				<td style="width: 105px; height: 23px;"><strong>&nbsp;</strong></td>
				<td style="width: 113px; height: 23px;">&nbsp;</td>
				<td style="width: 134px; height: 23px;">&nbsp;</td>
				<td style="width: 93px; height: 23px;" colspan="2">Č&iacute;slo &uacute;tvaru</td>
				<td style="width: 159px; height: 23px;"><strong>{$number}</strong></td>
			</tr>
			<tr style="height: 43px;">
				<td style="width: 457px; height: 43px;" colspan="4">ž&aacute;d&aacute; o dovolenou na zotavenou na kalend&aacute;řn&iacute; rok</td>
				<td style="width: 93px; height: 43px;">&nbsp;</td>
				<td style="width: 135px; height: 43px;">&nbsp;</td>
				<td style="width: 159px; height: 43px;">&nbsp;</td>
			</tr>
			<tr style="height: 23px;">
				<td style="width: 105px; height: 23px;">od</td>
				<td style="width: 105px; height: 23px;">&nbsp;</td>
				<td style="width: 113px; height: 23px;">do</td>
				<td style="width: 134px; height: 23px;">&nbsp;</td>
				<td style="width: 93px; height: 23px;">včetně, tj.</td>
				<td style="width: 135px; height: 23px;">&nbsp;</td>
				<td style="width: 159px; height: 23px;">pracovn&iacute;ch dnů</td>
			</tr>
			<tr style="height: 23px;">
				<td style="width: 323px; height: 23px;" colspan="3">&nbsp;</td>
				<td style="width: 521px; height: 23px;" colspan="4">&nbsp;</td>
			</tr>
			<tr style="height: 23px;">
				<td style="width: 323px; height: 23px;" colspan="3">M&iacute;sto pobytu o dovolen&eacute;</td>
				<td style="width: 134px; height: 23px;" colspan="4">&nbsp;</td>
			</tr>
			<tr style="height: 23px;">
				<td style="width: 323px; height: 23px; text-align: center;" colspan="3"><span style="text-decoration: underline;">{$day}</span></td>
				<td style="width: 134px; height: 23px;">&nbsp;</td>
				<td style="width: 387px; height: 23px; text-align: center;" colspan="3">&nbsp;____________________</td>
			</tr>
			<tr style="height: 23px;">
				<td style="width: 105px; text-align: center; height: 23px;" colspan="3"><em>Datum</em></td>
				<td style="width: 134px; height: 23px;">&nbsp;</td>
				<td style="width: 93px; text-align: center; height: 23px;" colspan="3"><em>Podpis pracovn&iacute;ka</em></td>
			</tr>
			</tbody>
		</table>
		<p>&nbsp;</p>
		<table  id="t01" style="height: 227px; width: 624px; " >
			<tbody>
			<tr style="height: 25px; border: 1px solid black; "  >
				<td style="width: 236px; height: 25px; border: 1px ;" colspan="4" >&nbsp;</td>
				<td style="width: 93px; height: 25px;">Datum</td>
				<td style="width: 135px; height: 25px;">Ved. &Uacute;tvaru</td>
				<td style="width: 159px; height: 25px;">Osobn&iacute; oddělen&iacute;</td>
			</tr>
			<tr style="height: 25px;">
				<td style="width: 236px; height: 25px;" colspan="4">Schv&aacute;lil</td>
				<td style="width: 93px; height: 25px;">&nbsp;</td>
				<td style="width: 135px; height: 25px;">&nbsp;</td>
				<td style="width: 159px; height: 25px;">&nbsp;</td>
			</tr>
			<tr style="height: 25px;">
				<td style="width: 236px; height: 25px;" colspan="4">Skutečn&yacute; n&aacute;stup dovolen&eacute;</td>
				<td style="width: 93px; height: 25px;">&nbsp;</td>
				<td style="width: 135px; height: 25px;">&nbsp;</td>
				<td style="width: 159px; height: 25px;">&nbsp;</td>
			</tr>
			<tr style="height: 43px;">
				<td style="width: 236px; height: 43px;" colspan="4">N&aacute;stup do zaměstn&aacute;n&iacute; po dovolen&eacute;</td>
				<td style="width: 93px; height: 43px;">&nbsp;</td>
				<td style="width: 135px; height: 43px;">&nbsp;</td>
				<td style="width: 159px; height: 43px;">&nbsp;</td>
			</tr>
			<tr style="height: 25px;">
				<td style="width: 464px; height: 25px;" colspan="6">Z t&eacute;to dovolen&eacute; skutečně čerp&aacute;no&hellip;&hellip;&hellip;&hellip;&hellip;pracovn&iacute;ch dnů</td>
				<td style="width: 159px; height: 25px;">&nbsp;</td>
			</tr>
			<tr style="height: 43px;">
				<td style="width: 623px; height: 43px;" colspan="7">Pozn&aacute;mky o mzdov&yacute;ch n&aacute;roc&iacute;ch, neodevzdan&yacute;ch n&aacute;stroj&iacute;ch, pracovn&iacute;ch pomůck&aacute;ch aj. uveďte na rubu</td>
			</tr>
			</tbody>
		</table>
		</body>
		</html>
		<?php
	}



    /**
     * @param integer $month
     * @param integer $year
     * @param integer [] $arrayUsers
     * @return boolean
     * @throws PHPExcel_Exception
     * @throws PHPExcel_Reader_Exception
     * @throws PHPExcel_Writer_Exception
     * @throws PermissionException
     */
	public static function generateReportForOneMonth($month, $year, $arrayUsers){
		///https://nicknixer.ru/programmirovanie/sozdanie-excel-dokumenta-na-php-generaciya-xls-fajlov/
		$document = new \PHPExcel();
		$alphabet = range('A', 'Z');

		$day = 1;
		$d = mktime(0, 0, 0, $month, $day, $year);

		$lastDayInMonth = date("t", strtotime($d));
//		echo '<pre>'; print_r($arrayUsers); echo '</pre>';

		for($index = 0; $index < count($arrayUsers); $index++) {
			$document->createSheet();
			$sheet = $document->setActiveSheetIndex($index);
			$user = UserService::findById($arrayUsers[$index]);
			$sheet->setTitle($user->getName()." ".$user->getLastName());
			$columnPosition = 0;
			$startLine = 1;

			// Вставляем заголовок в "A1"
			$sheet->setCellValueByColumnAndRow($columnPosition, $startLine, 'Evidence odpracované doby:');
			// Объединяем ячейки "A1:E1"
			$document->getActiveSheet()->mergeCellsByColumnAndRow($columnPosition, $startLine, array_search('E', $alphabet), $startLine);
			// Вставляем заголовок в "F1"
			$sheet->setCellValueByColumnAndRow(array_search('F', $alphabet), $startLine, $user->getName()." ".$user->getLastName());//$user_data['name']
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
				      ->setRGB("f4eb42");
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

			$workingHourInMonth = 0;
			$sickHours = 0;
			$holidaysHours = 0;
			$nationalHoliday = 0;

			for($day = 1; $day<$lastDayInMonth; $day++){
				$d = mktime(0, 0, 0, $month, $day, $year);
				$sheet->setCellValueByColumnAndRow(array_search('A', $alphabet), $startLine+$day, date("d.m.Y", $d));

				$arrayForOneLine = DayTimeSheet::findByUserIdAndDate($user->getId(), $day, $month, $year);
//				echo '<pre>'; print_r($arrayForOneLine); echo '</pre>';

				if($arrayForOneLine != null) {
					$sheet->setCellValueByColumnAndRow(array_search('B', $alphabet), $startLine+$day, $arrayForOneLine->getDate());
					if($arrayForOneLine->getDate()!= null || $arrayForOneLine->getDate()!= ""){
						$sheet->setCellValueByColumnAndRow(array_search('C', $alphabet), $startLine+$day, date('w', strtotime($arrayForOneLine->getDate())));
					}

                    if($arrayForOneLine->getFirstPartFrom() != null){
                        //first part
	                    $sheet->setCellValueByColumnAndRow(array_search('D', $alphabet), $startLine+$day, $arrayForOneLine->getFirstPartFrom());
	                    $sheet->setCellValueByColumnAndRow(array_search('E', $alphabet), $startLine+$day, $arrayForOneLine->getFirstPartTo());
	                    $timestamp1 = strtotime($arrayForOneLine->getFirstPartFrom());
	                    $timestamp2 = strtotime($arrayForOneLine->getFirstPartTo());
	                    $time = (date('H', $timestamp2)-date('H', $timestamp1));
	                    $time += (date('i', $timestamp2) - date('i', $timestamp1))/60;
	                    if(strpos($arrayForOneLine->getDayType(), "nemoc") !== false
	                       || strpos($arrayForOneLine->getDayType(), "OČR") !== false
//					   || strpos($arrayForOneLine->getDayType(), "tek") !== false
	                    ){
		                    $sickHours+=$time;
	                    }else if(strpos($arrayForOneLine->getDayType(), "dovolen") !== false){
		                    $holidaysHours +=$time;
	                    }else{
		                    $workingHourInMonth+=$time;
	                    }
	                    $sheet->setCellValueByColumnAndRow(array_search('F', $alphabet), $startLine+$day, $time);

	                    //pausa
                        if($arrayForOneLine->getSecondPartFrom() != null){
	                        $sheet->setCellValueByColumnAndRow(array_search('G', $alphabet), $startLine+$day, $arrayForOneLine->getFirstPartTo());
	                        $sheet->setCellValueByColumnAndRow(array_search('H', $alphabet), $startLine+$day, $arrayForOneLine->getSecondPartFrom());
	                        $timestamp1 = strtotime($arrayForOneLine->getFirstPartTo());
	                        $timestamp2 = strtotime($arrayForOneLine->getSecondPartFrom());
	                        $time = (date('H', $timestamp2)-date('H', $timestamp1));
	                        $time += (date('i', $timestamp2) - date('i', $timestamp1))/60;

	                        $sheet->setCellValueByColumnAndRow(array_search('I', $alphabet), $startLine+$day, $time);
                        }


                    }

                    if($arrayForOneLine->getSecondPartFrom() != null){
	                    $sheet->setCellValueByColumnAndRow(array_search('J', $alphabet), $startLine+$day, $arrayForOneLine->getSecondPartFrom());
	                    $sheet->setCellValueByColumnAndRow(array_search('K', $alphabet), $startLine+$day, $arrayForOneLine->getSecondPartTo());
	                    $timestamp1 = strtotime($arrayForOneLine->getSecondPartFrom());
	                    $timestamp2 = strtotime($arrayForOneLine->getSecondPartTo());
	                    $time = (date('H', $timestamp2)-date('H', $timestamp1));
	                    $time += (date('i', $timestamp2) - date('i', $timestamp1))/60;
	                    if(strpos($arrayForOneLine->getDayType(), "nemoc") !== false
	                       || strpos($arrayForOneLine->getDayType(), "OČR") !== false
//					   || strpos($arrayForOneLine->getDayType(), "tek") !== false
	                    ){
		                    $sickHours+=$time;
	                    }else if(strpos($arrayForOneLine->getDayType(), "dovolen") !== false){
		                    $holidaysHours +=$time;
	                    }else{
		                    $workingHourInMonth+=$time;
	                    }

	                    $sheet->setCellValueByColumnAndRow(array_search('L', $alphabet), $startLine+$day, $time);

                    }



					if(strpos($arrayForOneLine->getDayType(), "nemoc") !== false
					   || strpos($arrayForOneLine->getDayType(), "dovolen") !== false
					   || strpos($arrayForOneLine->getDayType(), "OČR") !== false
					){
						$sheet->setCellValueByColumnAndRow(array_search('Q', $alphabet), $startLine+$day, $arrayForOneLine->getDayType());
					}else if(strpos($arrayForOneLine->getDayType(), "cesta") !== false){
						$sheet->setCellValueByColumnAndRow(array_search('R', $alphabet), $startLine+$day, $arrayForOneLine->getDayType());
					}else{

						$sheet->setCellValueByColumnAndRow(array_search('R', $alphabet), $startLine+$day, $arrayForOneLine->getDayType());
					}
				}else{
					if(date("d.m.Y", $d) >= 1 && date("d.m.Y", $d) <=5){
						$attendance = AttendanceService::findByUserIdAndDate($user->getId(), $day, $month, $year);

						if($attendance != null){
							if($attendance->getFirstPartFrom() != null){
								$timestamp1 = strtotime($attendance->getFirstPartFrom());
								$timestamp2 = strtotime($attendance->getFirstPartTo());
								$time = (date('H', $timestamp2)-date('H', $timestamp1));
								$time += (date('i', $timestamp2) - date('i', $timestamp1))/60;
								$nationalHoliday+=$time;
							}
							if($attendance->getSecondPartFrom() != null){
								$timestamp1 = strtotime($attendance->getSecondPartFrom());
								$timestamp2 = strtotime($attendance->getSecondPartTo());
								$time = (date('H', $timestamp2)-date('H', $timestamp1));
								$time += (date('i', $timestamp2) - date('i', $timestamp1))/60;
								$nationalHoliday+=$time;
							}
						}
                    }
				}

			}
			$sheet->setCellValueByColumnAndRow(array_search('A', $alphabet), 36, "Evidence ostatních skutečností o náhradních a placených dobách je vedena standardním způsobem");
			$startLine = 38;
			$sheet->setCellValueByColumnAndRow(array_search('F', $alphabet), $startLine, "Celkem:");
			$projects = ProjectAssignService::findByUserIdAllActiveInMonthAndYear($user->getId(), $month, $year);
			$indexForFrame = 0;
			for($i = 1; $i<=count($projects); $i++){
				$percent = $projects[$i-1]->getObligation();
				$sheet->setCellValueByColumnAndRow(array_search('F', $alphabet)+$i+1, $startLine, $projects[$i-1]->getProject()->getProjectNameShort());
				$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet)+$i+1, $startLine+1, $workingHourInMonth*$percent);//Celkem odpracováno hodin
				$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet)+$i+1, $startLine+2, $nationalHoliday*$percent); //Fond prac. doby za státní svátky
				$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet)+$i+1, $startLine+3, ($workingHourInMonth+$nationalHoliday)*$percent); //Celkem se státními svátky
				$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet)+$i+1, $startLine+4, $holidaysHours*$percent); //Dovolená přepočtená na hodiny
				$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet)+$i+1, $startLine+5, $sickHours*$percent); //Nemocenská, OČR (přepočt. na hod.)
				$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet)+$i+1, $startLine+6, ($sickHours+$holidaysHours+$workingHourInMonth+$nationalHoliday)*$percent); //Celkem k proplacení
				$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet)+$i+1, $startLine+7, $workingHourInMonth*$percent); // Celkem disponibilní fond bez přestávek
				$indexForFrame = array_search("F", $alphabet)+$i+1;
			}
//			$indexForFrame+=2;

			$startLine= 39;
			$arrayForTableDownTable  = array("Celkem odpracováno hodin", "Fond prac. doby za státní svátky", "Celkem se státními svátky",
				"Dovolená přepočtená na hodiny", "Nemocenská, OČR (přepočt. na hod.)", "Celkem k proplacení", "Celkem disponibilní fond bez přestávek");

			for ($i = 0; $i<count($arrayForTableDownTable); $i++){
				$sheet->setCellValueByColumnAndRow(array_search('A', $alphabet), $startLine+$i, $arrayForTableDownTable[$i]);
				$document->getActiveSheet()->mergeCellsByColumnAndRow(array_search('A', $alphabet), $startLine+$i, array_search('E', $alphabet), $startLine+$i);
			}
			$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet), $startLine, $workingHourInMonth);//Celkem odpracováno hodin
			$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet), $startLine+1, $nationalHoliday); //Fond prac. doby za státní svátky
			$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet), $startLine+2, $workingHourInMonth+$nationalHoliday); //Celkem se státními svátky
			$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet), $startLine+3, $holidaysHours); //Dovolená přepočtená na hodiny
			$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet), $startLine+4, $sickHours); //Nemocenská, OČR (přepočt. na hod.)
			$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet), $startLine+5, $sickHours+$holidaysHours+$workingHourInMonth+$nationalHoliday); //Celkem k proplacení
			$sheet->setCellValueByColumnAndRow(array_search("F", $alphabet), $startLine+6, $workingHourInMonth); // Celkem disponibilní fond bez přestávek

			///style
			$border_style= array('borders' => array('allborders' => array('style' =>
				                                                              PHPExcel_Style_Border::BORDER_MEDIUM,'color' => array('argb' => '000000'),)));

			$sheet->getStyle("A1:R2")->applyFromArray($border_style);
			$sheet->getStyle("A".$startLine.":F".($startLine+6))->applyFromArray($border_style);

			$border_style= array('borders' => array('allborders' => array('style' =>
				                                                              PHPExcel_Style_Border::BORDER_THIN,'color' => array('argb' => '000000'),)));

			$sheet->getStyle("A4:Q35")->applyFromArray($border_style);


		}
		$document->removeSheetByIndex($document->getSheetCount()-1);

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
		$fileName = (__DIR__."/files/").date('d-m-Y').".xls";
		$objWriter->save($fileName);

		$finfo = finfo_open(FILEINFO_MIME_TYPE);
		header('Content-Type: '.finfo_file($finfo, $fileName));

		$finfo = finfo_open(FILEINFO_MIME_ENCODING);
		header('Content-Transfer-Encoding: '.finfo_file($finfo, $fileName));

		header('Content-disposition: attachment; filename="'.basename($fileName).'"');
		readfile($fileName); // do the double-download-dance (dirty but worky)

		return true;
	}


}