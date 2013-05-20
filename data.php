<?php
 
// eine beliebige PHP-Funktion
function getdata($arg1)
{
   if (empty ($arg1) )
				{
				  echo 'Please search Your APP';
				  echo '</div>		

						</div>				  
						</body>
						</html>';
				  return;
				}

				// Abfrage der Suche
				$searchApp = $arg1;

				//Appstore JSON Abfrage
				$jsonurl = "http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStoreServices.woa/wa/wsSearch?term=$searchApp*&entity=software";
				$json = file_get_contents($jsonurl, 0, null, null);
				$json_output = json_decode($json);

				//Anzsahl der gefundenen Apps zuweisen
				$anzahlapps = $json_output->{'resultCount'};

				// Ausgabe der gesuchten APP und die Anzahl der Treffer
				//echo "Search : $searchApp<span class=\"ui-li-count\"></span>  - $anzahlapps Apps found ";

				for($count = 0; $count < $anzahlapps ; $count++){    
				   // Icon-Pfad zuweisen    
				   $bildpfad = $json_output->{'results'}[$count]->{'artworkUrl60'};
				   //Name der App zuweisen
				   $appname = $json_output->{'results'}[$count]->{'trackName'};
				   // Beschreibungstext zuweisen
				   $beschreibung = $json_output->{'results'}[$count]->{'description'};
				   // Appstore Preis zuweisen
				   $preis = $json_output->{'results'}[$count]->{'price'};
				   // Appstore Link zuweisen
				   $appstoreLink = $json_output->{'results'}[$count]->{'trackViewUrl'};
				   
						
		echo '<div data-role="content" data-theme="a"><ul data-role="listview" data-split-icon="gear" data-split-theme="d"><br>';
		echo "<li><a href=\"$appstoreLink\">";	
		echo "<img src=\"$bildpfad\" />";
		echo "        <h3>$appname</h3>";
		echo "        <p>$beschreibung<br></p>";
		echo '			</a>';
		echo ' <a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>';
		echo '	</li> </ul>';
		echo "</div>";
		

				
				
				}
}
 
 
 function test2($arg1)
{
    echo "was neues " . $arg1 . " ..... ";
}
// per Argument in 'a' entscheiden welche Funktion aufgerufen werden soll
switch ($_POST['a'])
{
    case 'GetIT':
        getdata($_POST['b']);
        break;
 
    case 'test2':
		test2($_POST['b']);
		break;
		
    default:
        break;
}
?>