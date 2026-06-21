import React from 'react'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className="border-t bg-muted/20 py-12">
      <div className="wrapper text-center text-muted-foreground">
        Copyright &copy; Dannys Domain - All Rights Reserved
      </div>
    </footer>
  );
}