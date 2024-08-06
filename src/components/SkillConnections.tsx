"use client";
import { Coord, SkillConnection, SkillTree } from '@/types';
import { useEffect, useState } from 'react';

interface SkillConnectionsProps {
  skillTree: SkillTree;
  selectedSkills: number[];
}

const SkillConnections = ({ skillTree, selectedSkills }: SkillConnectionsProps) => {
  const [lineCoords, setLineCoords] = useState<Coord[]>([]);

  const calculateCoords = () => {
    const container = document.getElementById('skill-tree-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newCoords: Coord[] = [];
    Array.from({ length: 12 * 12 }, (_, i) => i + 1).forEach((id: number) => {
      const element = document.getElementById(`skill-${id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        newCoords.push({
          id,
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        });
      }
    });
    setLineCoords(newCoords);
  };

  useEffect(() => {
    calculateCoords();
  }, [skillTree]);

  const calculateMidCoords = (midPosition: string) => {
    return midPosition.split(',').map((mid) => {
      const [midLine, midPos] = mid.split('-').map(Number);
      return midLine * 12 + midPos;
    });
  };

  const getLine = (
    startId: number,
    midPosition: string | undefined,
    endId: number,
    startAnchor: string = 'top',
    endAnchor: string = 'bottom'
  ) => {
    const start = lineCoords.find((coord) => coord.id === startId);
    const end = lineCoords.find((coord) => coord.id === endId);
    const skillSize = 20;
    const offset = 10;

    if (!start || !end) {
      return null;
    }

    const isSelected = selectedSkills.includes(startId);
    const strokeColor = isSelected ? (selectedSkills.includes(endId) ? 'yellow' : 'white') : 'gray';

    let startX = start.x;
    let startY = start.y;

    switch (startAnchor) {
      case 'top':
        startY = start.y - skillSize / 2 - offset;
        break;
      case 'bottom':
        startY = start.y + skillSize / 2 + offset;
        break;
      case 'left':
        startX = start.x - skillSize / 2 - offset;
        break;
      case 'right':
        startX = start.x + skillSize / 2 + offset;
        break;
      default:
        break;
    }

    let endX = end.x;
    let endY = end.y;

    switch (endAnchor) {
      case 'top':
        endY = end.y - skillSize / 2 - offset;
        break;
      case 'bottom':
        endY = end.y + skillSize / 2 + offset;
        break;
      case 'left':
        endX = end.x - skillSize / 2 - offset;
        break;
      case 'right':
        endX = end.x + skillSize / 2 + offset;
        break;
      default:
        break;
    }

    if (midPosition) {
      const midCoords = calculateMidCoords(midPosition);
      const pathCommands = midCoords
        .map((midId) => {
          const mid = lineCoords.find((coord) => coord.id === midId);
          if (!mid) return '';
          return `L ${mid.x},${mid.y}`;
        })
        .join(' ');

      return (
        <path
          key={`${startId}-${midPosition}-${endId}`}
          d={`M ${startX},${startY} ${pathCommands} L ${endX},${endY}`}
          stroke={strokeColor}
          strokeWidth="2"
          fill="transparent"
          markerEnd="url(#arrowhead)"
        />
      );
    } else {
      return (
        <line
          key={`${startId}-${endId}`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={strokeColor}
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      );
    }
  };

  return (
    <svg className="absolute inset-0 z-0 min-w-[1500px] max-w-[1500px] h-full">
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="7" refY="3.5" orient="auto" fill="white">
        <polygon points="0 0, 8 3.5, 0 7" />
      </marker>
      {skillTree && skillTree.SkillConnection && skillTree.SkillConnection.map((connection: SkillConnection) => {
        const [endLine, endPos] = connection.endPosition.split('-').map(Number);
        const [startLine, startPos] = connection.startPosition.split('-').map(Number);
        return getLine(
          startLine * 12 + startPos,
          connection.midPosition,
          endLine * 12 + endPos,
          connection.startAnchor,
          connection.endAnchor
        );
      })}
    </svg>
  );
}

export default SkillConnections;
