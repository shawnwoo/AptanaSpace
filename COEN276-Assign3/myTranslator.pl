#!/usr/bin/perl -w 
# Student Name: Xiaopeng WU
# Student ID: 943724

use strict;



open(READFILE, "tablets.csv") or die print "Can't open the read file: $!\n";
open(WRITEFILE, ">tablets_943724.html") or die print "Can't open the write file: $!\n";
my @line;
my %tablets=();

while(<READFILE>){
  s/#.*//;  # ignore comments by erasing them
  next if/^(\s)*$/;  #skip blank lines
  chomp;

  @line=split(/,/,$_);

  if (exists $tablets{$line[1]}) 
  	{
  		$tablets{$line[1]}+=$line[2];
  	}
  else {
  	$tablets{$line[1]}=$line[2];
  }
}



sub htmlHead(){
	return "

<!DOCTYPE html>
	<html>
	<head style='text-align:center;'>
		<title>Tablet Usage<\/title>
		
	<\/head>

	<body style='width:900px;margin-left:auto;margin-right:auto;'>
		<h1>Tablet Usage<\/h1>
		<svg height='100%' width='100%' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n";
}

sub htmlTail(){
	return  "
		<\/svg>
	<\/body>
<\/html>"
}



print WRITEFILE htmlHead();

my $position=100;
my @colors=("red","blue","green");

for my $key(keys %tablets){
	my $value=$tablets{$key};
	$value/=10;
	
	my $fillColor=pop @colors;
	


	print WRITEFILE "<circle cx='200' cy='$position' r=\'$value\' stroke='black' stroke-width='2' fill=$fillColor \/>\n";
	print WRITEFILE"<text x= '400' y='$position' style='fill:black;font-size:25px;'>$key<\/text>\n";

	$position+=200;
}



print WRITEFILE htmlTail();


#open(LOGFILE, ">>");
# my $time = time();
# print LOGFILE "Just wrote all caps to out.txt at $time\n";

close(READFILE);
close(WRITEFILE);
# close(LOGFILE);


