-------- Wymagania:
NodeJS
https://nodejs.org/en/

-------- Uruchamianie
wykonaj "npm build" w folderze projektu (projekt się przekompiluje)
ustaw config.json
wykonaj "npm start" (program startuje)


-------- Config:
url: link, z którego będą brane dane
interval: co ile milisekund mamy pobierać dane? (jeśli dasz za nisko, pap.pl może cię zablokować, lub net nie wytrzyma)
mail_receiver: mail na który będą wysyłane notyfikacje
filtering.string_keywords: jeśli którykolwiek ze stringów się pojawi w tytule, tytuł ten zostanie on wysłany (case insensitive)
filtering.regex_keywords: jeśli którykolwiek z regexów wyłapie tytuł, tytuł ten zostanie wysłany  (case insensitive)