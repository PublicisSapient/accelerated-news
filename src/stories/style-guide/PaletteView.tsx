import React, { Fragment } from 'react';
import { Color, Palette } from './Colors';
import './PaletteView.css';

export interface ColorViewProps {
  color: Color;
}

const ColorView = ({ color }: ColorViewProps) => {
  return (
    <div className="color-view">
      <div
        className="color-view__swatch"
        style={{ backgroundColor: color.value }}
      />
      <p className="color-view__symbol">
        {color.symbol} {color.altSymbol ? `(${color.altSymbol})` : null}
      </p>
      <p className="color-view__value">{color.value}</p>
    </div>
  );
};

interface ColorRowProps {
  palette: Palette;
}

const ColorRow = ({ palette }: ColorRowProps) => {
  return (
    <div className="flex">
      {palette.map((color) => (
        <ColorView key={color.symbol} color={color} />
      ))}
    </div>
  );
};

export interface PaletteViewProps {
  palette: Palette;
}

export const PaletteView = ({ palette }: PaletteViewProps) => {
  // break the palette into sub-palettes
  const colorsPerSubPalette = 5;

  const subPalettes = palette.reduce(
    (accumulator: Array<Palette>, color: Color, index: number) => {
      const subPaletteIndex = Math.floor(index / colorsPerSubPalette);

      if (!accumulator[subPaletteIndex]) {
        // start a new row
        accumulator[subPaletteIndex] = [];
      }

      accumulator[subPaletteIndex].push(color);

      return accumulator;
    },
    []
  );

  return (
    <Fragment>
      {subPalettes.map((subPalette, index) => (
        <ColorRow key={index} palette={subPalette} />
      ))}
    </Fragment>
  );
};
