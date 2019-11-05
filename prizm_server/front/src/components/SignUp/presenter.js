import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup';

const COUNTRY_NUMBER = [
    {value: '93', label: 'Afghanistan'},
    {value: '358', label: 'Aland Islands'},
    {value: '355', label: 'Albania'},
    {value: '213', label: 'Algeria'},
    {value: '1-684', label: 'American Samoa'},
    {value: '376', label: 'Andorra'},
    {value: '244', label: 'Angola'},
    {value: '1-264', label: 'Anguilla'},
    {value: '672', label: 'Antarctica'},
    {value: '1-268', label: 'Antigua and Barbuda'},
    {value: '54', label: 'Argentina'},
    {value: '374', label: 'Armenia'},
    {value: '297', label: 'Aruba'},
    {value: '61', label: 'Australia'},
    {value: '43', label: 'Austria'},
    {value: '994', label: 'Azerbaijan'},
    {value: '1-242', label: 'Bahamas'},
    {value: '973', label: 'Bahrain'},
    {value: '880', label: 'Bangladesh'},
    {value: '1-246', label: 'Barbados'},
    {value: '375', label: 'Belarus'},
    {value: '32', label: 'Belgium'},
    {value: '501', label: 'Belize'},
    {value: '229', label: 'Benin'},
    {value: '1-441', label: 'Bermuda'},
    {value: '975', label: 'Bhutan'},
    {value: '591', label: 'Bolivia, Plurinational State of'},
    {value: '387', label: 'Bosnia and Herzegovina'},
    {value: '267', label: 'Botswana'},
    {value: '55', label: 'Brazil'},
    {value: '246', label: 'British Indian Ocean Territory'},
    {value: '673', label: 'Brunei Darussalam'},
    {value: '359', label: 'Bulgaria'},
    {value: '226', label: 'Burkina Faso'},
    {value: '257', label: 'Burundi'},
    {value: '855', label: 'Cambodia'},
    {value: '237', label: 'Cameroon'},
    {value: '1', label: 'Canada'},
    {value: '238', label: 'Cape Verde'},
    {value: '1-345', label: 'Cayman Islands'},
    {value: '236', label: 'Central African Republic'},
    {value: '235', label: 'Chad'},
    {value: '56', label: 'Chile'},
    {value: '86', label: 'China'},
    {value: '61', label: 'Christmas Island'},
    {value: '61', label: 'Cocos Islands'},
    {value: '57', label: 'Colombia'},
    {value: '269', label: 'Comoros'},
    {value: '242', label: 'Congo'},
    {value: '243', label: 'Congo, the Democratic Republic of the'},
    {value: '682', label: 'Cook Islands'},
    {value: '506', label: 'Costa Rica'},
    {value: '225', label: "Cote d'Ivoire"},
    {value: '385', label: 'Croatia'},
    {value: '53', label: 'Cuba'},
    {value: '599', label: 'Curacao'},
    {value: '357', label: 'Cyprus'},
    {value: '420', label: 'Czech Republic'},
    {value: '45', label: 'Denmark'},
    {value: '253', label: 'Djibouti'},
    {value: '1-767', label: 'Dominica'},
    {value: '809', label: 'Dominican Republic'},
    {value: '593', label: 'Ecuador'},
    {value: '20', label: 'Egypt'},
    {value: '503', label: 'El Salvador'},
    {value: '240', label: 'Equatorial Guinea'},
    {value: '291', label: 'Eritrea'},
    {value: '372', label: 'Estonia'},
    {value: '251', label: 'Ethiopia'},
    {value: '500', label: 'Falkland Islands'},
    {value: '298', label: 'Faroe Islands'},
    {value: '679', label: 'Fiji'},
    {value: '358', label: 'Finland'},
    {value: '33', label: 'France'},
    {value: '689', label: 'French Polynesia'},
    {value: '241', label: 'Gabon'},
    {value: '220', label: 'Gambia'},
    {value: '995', label: 'Georgia'},
    {value: '49', label: 'Germany'},
    {value: '233', label: 'Ghana'},
    {value: '350', label: 'Gibraltar'},
    {value: '30', label: 'Greece'},
    {value: '299', label: 'Greenland'},
    {value: '1-473', label: 'Grenada'},
    {value: '590', label: 'Guadeloupe'},
    {value: '1-671', label: 'Guam'},
    {value: '502', label: 'Guatemala'},
    {value: '44-1481', label: 'Guernsey'},
    {value: '224', label: 'Guinea'},
    {value: '245', label: 'Guinea-Bissau'},
    {value: '592', label: 'Guyana'},
    {value: '509', label: 'Haiti'},
    {value: '379', label: 'Holy See {value: Vatican City State)'},
    {value: '504', label: 'Honduras'},
    {value: '852', label: 'Hong Kong'},
    {value: '36', label: 'Hungary'},
    {value: '354', label: 'Iceland'},
    {value: '91', label: 'India'},
    {value: '62', label: 'Indonesia'},
    {value: '98', label: 'Iran, Islamic Republic of'},
    {value: '964', label: 'Iraq'},
    {value: '353', label: 'Ireland'},
    {value: '44-1624', label: 'Isle of Man'},
    {value: '972', label: 'Israel'},
    {value: '39', label: 'Italy'},
    {value: '1-876', label: 'Jamaica'},
    {value: '81', label: 'Japan'},
    {value: '44-1534', label: 'Jersey'},
    {value: '962', label: 'Jordan'},
    {value: '7', label: 'Kazakhstan'},
    {value: '254', label: 'Kenya'},
    {value: '686', label: 'Kiribati'},
    {value: '850', label: "Korea, Democratic People's Republic of"},
    {value: '82', label: 'Korea, Republic of'},
    {value: '965', label: 'Kuwait'},
    {value: '996', label: 'Kyrgyzstan'},
    {value: '856', label: "LAOS"},
    {value: '371', label: 'Latvia'},
    {value: '961', label: 'Lebanon'},
    {value: '266', label: 'Lesotho'},
    {value: '231', label: 'Liberia'},
    {value: '218', label: 'Libya'},
    {value: '423', label: 'Liechtenstein'},
    {value: '370', label: 'Lithuania'},
    {value: '352', label: 'Luxembourg'},
    {value: '853', label: 'Macao'},
    {value: '389', label: 'Macedonia'},
    {value: '261', label: 'Madagascar'},
    {value: '265', label: 'Malawi'},
    {value: '60', label: 'Malaysia'},
    {value: '960', label: 'Maldives'},
    {value: '223', label: 'Mali'},
    {value: '356', label: 'Malta'},
    {value: '692', label: 'Marshall Islands'},
    {value: '596', label: 'Martinique'},
    {value: '222', label: 'Mauritania'},
    {value: '230', label: 'Mauritius'},
    {value: '262', label: 'Mayotte'},
    {value: '52', label: 'Mexico'},
    {value: '691', label: 'Micronesia, Federated States of'},
    {value: '373', label: 'Moldova, Republic of'},
    {value: '377', label: 'Monaco'},
    {value: '976', label: 'Mongolia'},
    {value: '382', label: 'Montenegro'},
    {value: '1-664', label: 'Montserrat'},
    {value: '212', label: 'Morocco'},
    {value: '258', label: 'Mozambique'},
    {value: '95', label: 'Myanmar'},
    {value: '264', label: 'Namibia'},
    {value: '674', label: 'Nauru'},
    {value: '977', label: 'Nepal'},
    {value: '31', label: 'Netherlands'},
    {value: '687', label: 'New Caledonia'},
    {value: '64', label: 'New Zealand'},
    {value: '505', label: 'Nicaragua'},
    {value: '227', label: 'Niger'},
    {value: '234', label: 'Nigeria'},
    {value: '683', label: 'Niue'},
    {value: '672', label: 'Norfolk Island'},
    {value: '1-670', label: 'Northern Mariana Islands'},
    {value: '47', label: 'Norway'},
    {value: '968', label: 'Oman'},
    {value: '92', label: 'Pakistan'},
    {value: '680', label: 'Palau'},
    {value: '670', label: 'Palestine, State of'},
    {value: '507', label: 'Panama'},
    {value: '675', label: 'Papua New Guinea'},
    {value: '595', label: 'Paraguay'},
    {value: '51', label: 'Peru'},
    {value: '63', label: 'Philippines'},
    {value: '64', label: 'Pitcairn'},
    {value: '48', label: 'Poland'},
    {value: '351', label: 'Portugal'},
    {value: '1-787', label: 'Puerto Rico'},
    {value: '974', label: 'Qatar'},
    {value: '262', label: 'Reunion'},
    {value: '40', label: 'Romania'},
    {value: '7', label: 'Russia'},
    {value: '250', label: 'Rwanda'},
    {value: '590', label: 'Saint Barthelemy'},
    {value: '290', label: 'Saint Helena, Ascension and Tristan da Cunha'},
    {value: '1-869', label: 'Saint Kitts and Nevis'},
    {value: '1-758', label: 'Saint Lucia'},
    {value: '590', label: 'Saint Martin'},
    {value: '508', label: 'Saint Pierre and Miquelon'},
    {value: '1-784', label: 'Saint Vincent and the Grenadines'},
    {value: '685', label: 'Samoa'},
    {value: '378', label: 'San Marino'},
    {value: '239', label: 'Sao Tome and Principe'},
    {value: '966', label: 'Saudi Arabia'},
    {value: '221', label: 'Senegal'},
    {value: '381', label: 'Serbia'},
    {value: '248', label: 'Seychelles'},
    {value: '232', label: 'Sierra Leone'},
    {value: '65', label: 'Singapore'},
    {value: '1-721', label: 'Sint Maarten'},
    {value: '421', label: 'Slovakia'},
    {value: '386', label: 'Slovenia'},
    {value: '677', label: 'Solomon Islands'},
    {value: '252', label: 'Somalia'},
    {value: '27', label: 'South Africa'},
    {value: '500', label: 'South Georgia and the South Sandwich Islands'},
    {value: '211', label: 'South Sudan'},
    {value: '34', label: 'Spain'},
    {value: '94', label: 'Sri Lanka'},
    {value: '249', label: 'Sudan'},
    {value: '597', label: 'Suriname'},
    {value: '47', label: 'Svalbard and Jan Mayen'},
    {value: '268', label: 'Swaziland'},
    {value: '46', label: 'Sweden'},
    {value: '41', label: 'Switzerland'},
    {value: '963', label: 'Syrian Arab Republic'},
    {value: '886', label: 'Taiwan, Province of China'},
    {value: '992', label: 'Tajikistan'},
    {value: '255', label: 'Tanzania, United Republic of'},
    {value: '66', label: 'Thailand'},
    {value: '670', label: 'Timor-Leste'},
    {value: '228', label: 'Togo'},
    {value: '690', label: 'Tokelau'},
    {value: '676', label: 'Tonga'},
    {value: '1-868', label: 'Trinidad and Tobago'},
    {value: '216', label: 'Tunisia'},
    {value: '90', label: 'Turkey'},
    {value: '993', label: 'Turkmenistan'},
    {value: '1-649', label: 'Turks and Caicos Islands'},
    {value: '688', label: 'Tuvalu'},
    {value: '256', label: 'Uganda'},
    {value: '380', label: 'Ukraine'},
    {value: '971', label: 'United Arab Emirates'},
    {value: '44', label: 'United Kingdom'},
    {value: '1', label: 'United States'},
    {value: '246', label: 'United States Minor Outlying Islands'},
    {value: '598', label: 'Uruguay'},
    {value: '998', label: 'Uzbekistan'},
    {value: '678', label: 'Vanuatu'},
    {value: '58', label: 'Venezuela, Bolivarian Republic of'},
    {value: '84', label: 'Vietnam'},
    {value: '1284', label: 'Virgin Islands, British'},
    {value: '1', label: 'Virgin Islands, U.S.'},
    {value: '681', label: 'Wallis and Futuna'},
    {value: '212', label: 'Western Sahara'},
    {value: '967', label: 'Yemen'},
    {value: '260', label: 'Zambia'},
    {value: '263', label: 'Zimbabwe'},
]

const COUNTRY_CODE = [
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Aland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'},
    {value: 'AM', label: 'Armenia'},
    {value: 'AW', label: 'Aruba'},
    {value: 'AU', label: 'Australia'},
    {value: 'AT', label: 'Austria'},
    {value: 'AZ', label: 'Azerbaijan'},
    {value: 'BS', label: 'Bahamas'},
    {value: 'BH', label: 'Bahrain'},
    {value: 'BD', label: 'Bangladesh'},
    {value: 'BB', label: 'Barbados'},
    {value: 'BY', label: 'Belarus'},
    {value: 'BE', label: 'Belgium'},
    {value: 'BZ', label: 'Belize'},
    {value: 'BJ', label: 'Benin'},
    {value: 'BM', label: 'Bermuda'},
    {value: 'BT', label: 'Bhutan'},
    {value: 'BO', label: 'Bolivia, Plurinational State of'},
    {value: 'BA', label: 'Bosnia and Herzegovina'},
    {value: 'BW', label: 'Botswana'},
    {value: 'BR', label: 'Brazil'},
    {value: 'IO', label: 'British Indian Ocean Territory'},
    {value: 'BN', label: 'Brunei Darussalam'},
    {value: 'BG', label: 'Bulgaria'},
    {value: 'BF', label: 'Burkina Faso'},
    {value: 'BI', label: 'Burundi'},
    {value: 'KH', label: 'Cambodia'},
    {value: 'CM', label: 'Cameroon'},
    {value: 'CA', label: 'Canada'},
    {value: 'CV', label: 'Cape Verde'},
    {value: 'KY', label: 'Cayman Islands'},
    {value: 'CF', label: 'Central African Republic'},
    {value: 'TD', label: 'Chad'},
    {value: 'CL', label: 'Chile'},
    {value: 'CN', label: 'China'},
    {value: 'CX', label: 'Christmas Island'},
    {value: 'CC', label: 'Cocos Islands'},
    {value: 'CO', label: 'Colombia'},
    {value: 'KM', label: 'Comoros'},
    {value: 'CG', label: 'Congo'},
    {value: 'CD', label: 'Congo, the Democratic Republic of the'},
    {value: 'CK', label: 'Cook Islands'},
    {value: 'CR', label: 'Costa Rica'},
    {value: 'CI', label: "Cote d'Ivoire"},
    {value: 'HR', label: 'Croatia'},
    {value: 'CU', label: 'Cuba'},
    {value: 'CW', label: 'Curacao'},
    {value: 'CY', label: 'Cyprus'},
    {value: 'CZ', label: 'Czech Republic'},
    {value: 'DK', label: 'Denmark'},
    {value: 'DJ', label: 'Djibouti'},
    {value: 'DM', label: 'Dominica'},
    {value: 'DO', label: 'Dominican Republic'},
    {value: 'EC', label: 'Ecuador'},
    {value: 'EG', label: 'Egypt'},
    {value: 'SV', label: 'El Salvador'},
    {value: 'GQ', label: 'Equatorial Guinea'},
    {value: 'ER', label: 'Eritrea'},
    {value: 'EE', label: 'Estonia'},
    {value: 'ET', label: 'Ethiopia'},
    {value: 'FK', label: 'Falkland Islands'},
    {value: 'FO', label: 'Faroe Islands'},
    {value: 'FJ', label: 'Fiji'},
    {value: 'FI', label: 'Finland'},
    {value: 'FR', label: 'France'},
    {value: 'PF', label: 'French Polynesia'},
    {value: 'GA', label: 'Gabon'},
    {value: 'GM', label: 'Gambia'},
    {value: 'GE', label: 'Georgia'},
    {value: 'DE', label: 'Germany'},
    {value: 'GH', label: 'Ghana'},
    {value: 'GI', label: 'Gibraltar'},
    {value: 'GR', label: 'Greece'},
    {value: 'GL', label: 'Greenland'},
    {value: 'GD', label: 'Grenada'},
    {value: 'GP', label: 'Guadeloupe'},
    {value: 'GU', label: 'Guam'},
    {value: 'GT', label: 'Guatemala'},
    {value: 'GG', label: 'Guernsey'},
    {value: 'GN', label: 'Guinea'},
    {value: 'GW', label: 'Guinea-Bissau'},
    {value: 'GY', label: 'Guyana'},
    {value: 'HT', label: 'Haiti'},
    {value: 'VA', label: 'Holy See {value: Vatican City State)'},
    {value: 'HN', label: 'Honduras'},
    {value: 'HK', label: 'Hong Kong'},
    {value: 'HU', label: 'Hungary'},
    {value: 'IS', label: 'Iceland'},
    {value: 'IN', label: 'India'},
    {value: 'ID', label: 'Indonesia'},
    {value: 'IR', label: 'Iran, Islamic Republic of'},
    {value: 'IQ', label: 'Iraq'},
    {value: 'IE', label: 'Ireland'},
    {value: 'IM', label: 'Isle of Man'},
    {value: 'IL', label: 'Israel'},
    {value: 'IT', label: 'Italy'},
    {value: 'JM', label: 'Jamaica'},
    {value: 'JP', label: 'Japan'},
    {value: 'JE', label: 'Jersey'},
    {value: 'JO', label: 'Jordan'},
    {value: 'KZ', label: 'Kazakhstan'},
    {value: 'KE', label: 'Kenya'},
    {value: 'KI', label: 'Kiribati'},
    {value: 'KP', label: "Korea, Democratic People's Republic of"},
    {value: 'KR', label: 'Korea, Republic of'},
    {value: 'KW', label: 'Kuwait'},
    {value: 'KG', label: 'Kyrgyzstan'},
    {value: 'LA', label: "LAOS"},
    {value: 'LV', label: 'Latvia'},
    {value: 'LB', label: 'Lebanon'},
    {value: 'LS', label: 'Lesotho'},
    {value: 'LR', label: 'Liberia'},
    {value: 'LY', label: 'Libya'},
    {value: 'LI', label: 'Liechtenstein'},
    {value: 'LT', label: 'Lithuania'},
    {value: 'LU', label: 'Luxembourg'},
    {value: 'MO', label: 'Macao'},
    {value: 'MK', label: 'Macedonia'},
    {value: 'MG', label: 'Madagascar'},
    {value: 'MW', label: 'Malawi'},
    {value: 'MY', label: 'Malaysia'},
    {value: 'MV', label: 'Maldives'},
    {value: 'ML', label: 'Mali'},
    {value: 'MT', label: 'Malta'},
    {value: 'MH', label: 'Marshall Islands'},
    {value: 'MQ', label: 'Martinique'},
    {value: 'MR', label: 'Mauritania'},
    {value: 'MU', label: 'Mauritius'},
    {value: 'YT', label: 'Mayotte'},
    {value: 'MX', label: 'Mexico'},
    {value: 'FM', label: 'Micronesia, Federated States of'},
    {value: 'MD', label: 'Moldova, Republic of'},
    {value: 'MC', label: 'Monaco'},
    {value: 'MN', label: 'Mongolia'},
    {value: 'ME', label: 'Montenegro'},
    {value: 'MS', label: 'Montserrat'},
    {value: 'MA', label: 'Morocco'},
    {value: 'MZ', label: 'Mozambique'},
    {value: 'MM', label: 'Myanmar'},
    {value: 'NA', label: 'Namibia'},
    {value: 'NR', label: 'Nauru'},
    {value: 'NP', label: 'Nepal'},
    {value: 'NL', label: 'Netherlands'},
    {value: 'NC', label: 'New Caledonia'},
    {value: 'NZ', label: 'New Zealand'},
    {value: 'NI', label: 'Nicaragua'},
    {value: 'NE', label: 'Niger'},
    {value: 'NG', label: 'Nigeria'},
    {value: 'NU', label: 'Niue'},
    {value: 'NF', label: 'Norfolk Island'},
    {value: 'MP', label: 'Northern Mariana Islands'},
    {value: 'NO', label: 'Norway'},
    {value: 'OM', label: 'Oman'},
    {value: 'PK', label: 'Pakistan'},
    {value: 'PW', label: 'Palau'},
    {value: 'PS', label: 'Palestine, State of'},
    {value: 'PA', label: 'Panama'},
    {value: 'PG', label: 'Papua New Guinea'},
    {value: 'PY', label: 'Paraguay'},
    {value: 'PE', label: 'Peru'},
    {value: 'PH', label: 'Philippines'},
    {value: 'PN', label: 'Pitcairn'},
    {value: 'PL', label: 'Poland'},
    {value: 'PT', label: 'Portugal'},
    {value: 'PR', label: 'Puerto Rico'},
    {value: 'QA', label: 'Qatar'},
    {value: 'RE', label: 'Reunion'},
    {value: 'RO', label: 'Romania'},
    {value: 'RU', label: 'Russia'},
    {value: 'RW', label: 'Rwanda'},
    {value: 'BL', label: 'Saint Barthelemy'},
    {value: 'SH', label: 'Saint Helena, Ascension and Tristan da Cunha'},
    {value: 'KN', label: 'Saint Kitts and Nevis'},
    {value: 'LC', label: 'Saint Lucia'},
    {value: 'MF', label: 'Saint Martin'},
    {value: 'PM', label: 'Saint Pierre and Miquelon'},
    {value: 'VC', label: 'Saint Vincent and the Grenadines'},
    {value: 'WS', label: 'Samoa'},
    {value: 'SM', label: 'San Marino'},
    {value: 'ST', label: 'Sao Tome and Principe'},
    {value: 'SA', label: 'Saudi Arabia'},
    {value: 'SN', label: 'Senegal'},
    {value: 'RS', label: 'Serbia'},
    {value: 'SC', label: 'Seychelles'},
    {value: 'SL', label: 'Sierra Leone'},
    {value: 'SG', label: 'Singapore'},
    {value: 'SX', label: 'Sint Maarten'},
    {value: 'SK', label: 'Slovakia'},
    {value: 'SI', label: 'Slovenia'},
    {value: 'SB', label: 'Solomon Islands'},
    {value: 'SO', label: 'Somalia'},
    {value: 'ZA', label: 'South Africa'},
    {value: 'GS', label: 'South Georgia and the South Sandwich Islands'},
    {value: 'SS', label: 'South Sudan'},
    {value: 'ES', label: 'Spain'},
    {value: 'LK', label: 'Sri Lanka'},
    {value: 'SD', label: 'Sudan'},
    {value: 'SR', label: 'Suriname'},
    {value: 'SJ', label: 'Svalbard and Jan Mayen'},
    {value: 'SZ', label: 'Swaziland'},
    {value: 'SE', label: 'Sweden'},
    {value: 'CH', label: 'Switzerland'},
    {value: 'SY', label: 'Syrian Arab Republic'},
    {value: 'TW', label: 'Taiwan, Province of China'},
    {value: 'TJ', label: 'Tajikistan'},
    {value: 'TZ', label: 'Tanzania, United Republic of'},
    {value: 'TH', label: 'Thailand'},
    {value: 'TL', label: 'Timor-Leste'},
    {value: 'TG', label: 'Togo'},
    {value: 'TK', label: 'Tokelau'},
    {value: 'TO', label: 'Tonga'},
    {value: 'TT', label: 'Trinidad and Tobago'},
    {value: 'TN', label: 'Tunisia'},
    {value: 'TR', label: 'Turkey'},
    {value: 'TM', label: 'Turkmenistan'},
    {value: 'TC', label: 'Turks and Caicos Islands'},
    {value: 'TV', label: 'Tuvalu'},
    {value: 'UG', label: 'Uganda'},
    {value: 'UA', label: 'Ukraine'},
    {value: 'AE', label: 'United Arab Emirates'},
    {value: 'GB', label: 'United Kingdom'},
    {value: 'US', label: 'United States'},
    {value: 'UM', label: 'United States Minor Outlying Islands'},
    {value: 'UY', label: 'Uruguay'},
    {value: 'UZ', label: 'Uzbekistan'},
    {value: 'VU', label: 'Vanuatu'},
    {value: 'VE', label: 'Venezuela, Bolivarian Republic of'},
    {value: 'VN', label: 'Vietnam'},
    {value: 'VG', label: 'Virgin Islands, British'},
    {value: 'VI', label: 'Virgin Islands, U.S.'},
    {value: 'WF', label: 'Wallis and Futuna'},
    {value: 'EH', label: 'Western Sahara'},
    {value: 'YE', label: 'Yemen'},
    {value: 'ZM', label: 'Zambia'},
    {value: 'ZW', label: 'Zimbabwe'},
]

const SignUp = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer} ${props.page !== 'signup' && styles.opacity4}`} onClick={() => props.handleChangePage('signup')}>{context.t("Sign Up")}</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.mx2}`}>|</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer} ${props.page !== 'signin' && styles.opacity4}`} onClick={() => props.handleChangePage('signin')}>{context.t("Sign In")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{context.t("Full name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"name"} value={props.name} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Email")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Mobile")}</p>
        <div className={`${styles.positionRelative}`}>
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={props.handleShowCountryNumber}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 16}}>
                        <p className={`${styles.font13}`}>{props.countryNumber ? `+${props.countryNumber}` : `${props.countryNumber}`}</p>
                        {props.showCountryNumber ? (
                            <MdArrowDropup fontSize="16px" color="#000000" />
                        ) : (
                            <MdArrowDropdown fontSize="16px" color="#000000" />
                        )}
                    </div>
                </div>
                <div className={`${styles.textInput3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                    <div className={`${styles.col10} ${styles.px0}`}>
                        <input className={`${styles.textInput4}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} />
                    </div>
                    <p className={`${styles.font11} ${styles.fontBold} ${styles.pink} ${styles.cursorPointer}`}>{context.t("Verify")}</p>
                </div>
            </div>
            <div className={`${props.showCountryNumber ? null : styles.none} ${styles.positionDropdown} ${styles.overflowYScroll} ${styles.bgWhite}`} style={{maxHeight: 200, width: 65}}>
                {COUNTRY_NUMBER.map((country, index) => (
                    <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer}`} onClick={() => props.handleCountryNumberChange(country.value)}>{`+${country.value}`}</p>
                ))}
            </div>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.my3} ${styles.font10}`}>
            {context.t("Your reservation details and confirmation message from photographers will be sent to your email and mobile number.")}
        </p>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Date of Birth(YY/MM/DD)")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"birth"} value={props.birth} onChange={props.handleInputChange} maxLength={6} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Country/Region")}</p>
        <div className={`${styles.widthFull}`}>
            <div className={`${styles.textInput2} ${styles.cursorPointer}`} onClick={props.handleShowCountryCode}>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 16}}>
                    <p className={`${styles.font13}`}>{props.countryCode ? props.countryCode.label : ``}</p>
                    {props.showCountryCode ? (
                        <MdArrowDropup fontSize="16px" color="#000000" />
                    ) : (
                        <MdArrowDropdown fontSize="16px" color="#000000" />
                    )}
                </div>
            </div>
        </div>
        <div className={`${props.showCountryCode ? null : styles.none} ${styles.borderDropdown} ${styles.overflowYScroll} ${styles.bgWhite}`} style={{maxHeight: 200, width: '100%'}}>
            {COUNTRY_CODE.map((country, index) => (
                <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer}`} onClick={() => props.handleCountryCodeChange(country)}>{`${country.label}`}</p>
            ))}
        </div>
        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("submit the request")}</p>
        </div>
    </div>
)

SignUp.propTypes = {
    page: PropTypes.string.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    countryNumber: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    countryCode: PropTypes.object.isRequired,
    handleCountryNumberChange: PropTypes.func.isRequired,
    showCountryNumber: PropTypes.bool.isRequired,
    handleShowCountryNumber: PropTypes.func.isRequired,
    showCountryCode: PropTypes.bool.isRequired,
    handleShowCountryCode: PropTypes.func.isRequired,
    handleCountryCodeChange: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired
}

SignUp.contextTypes = {
    t: PropTypes.func
}

export default SignUp;
