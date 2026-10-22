/**
 * Aditya Security Labs — Real Earth 3D Globe & Live Attack Proof Simulator
 * Realistic Earth rendering (Blue Marble oceans, emerald continents, drifting cloud layer),
 * Real audited target nodes with official CVE proof disclosures,
 * real-time moving attack missiles, defensive shield bursts, and live proof telemetry.
 */

(function () {
  'use strict';

  const LAND_DOTS = [[-70,-65.9],[-70,30.7],[-70,39.5],[-70,48.3],[-70,57.1],[-70,65.9],[-70,74.6],[-70,83.4],[-70,92.2],[-70,101.0],[-70,109.8],[-70,118.5],[-70,127.3],[-70,136.1],[-70,144.9],[-70,153.7],[-67,54.8],[-67,101.7],[-67,109.6],[-67,117.4],[-67,125.2],[-67,133.0],[-67,140.9],[-55,-68.8],[-52,-71.5],[-49,-73.8],[-49,-69.2],[-49,69.2],[-46,-71.6],[-46,167.0],[-43,-72.4],[-43,-68.3],[-43,146.9],[-43,171.7],[-40,-73.2],[-40,-69.2],[-40,-65.3],[-40,176.0],[-37,-70.1],[-37,-66.3],[-37,-62.5],[-37,-58.7],[-37,142.1],[-37,145.9],[-37,149.7],[-34,-70.9],[-34,-67.3],[-34,-63.6],[-34,-60.0],[-34,-56.4],[-34,20.0],[-34,118.2],[-34,136.4],[-34,140.0],[-34,143.6],[-34,147.3],[-34,150.9],[-31,-70.6],[-31,-67.1],[-31,-63.5],[-31,-60.0],[-31,-56.5],[-31,-52.9],[-31,21.2],[-31,24.7],[-31,28.2],[-31,116.5],[-31,120.0],[-31,123.5],[-31,127.1],[-31,130.6],[-31,134.1],[-31,137.6],[-31,141.2],[-31,144.7],[-31,148.2],[-31,151.8],[-28,-70.3],[-28,-66.9],[-28,-63.4],[-28,-60.0],[-28,-56.6],[-28,-53.1],[-28,-49.7],[-28,18.9],[-28,22.3],[-28,25.7],[-28,29.1],[-28,114.9],[-28,118.3],[-28,121.7],[-28,125.1],[-28,128.6],[-28,132.0],[-28,135.4],[-28,138.9],[-28,142.3],[-28,145.7],[-28,149.1],[-28,152.6],[-25,-70.0],[-25,-66.7],[-25,-63.3],[-25,-60.0],[-25,-56.7],[-25,-53.3],[-25,-50.0],[-25,16.7],[-25,20.0],[-25,23.3],[-25,26.7],[-25,30.0],[-25,33.3],[-25,46.7],[-25,116.7],[-25,120.0],[-25,123.3],[-25,126.7],[-25,130.0],[-25,133.3],[-25,136.7],[-25,140.0],[-25,143.3],[-25,146.7],[-25,150.0],[-22,-69.7],[-22,-66.5],[-22,-63.2],[-22,-60.0],[-22,-56.8],[-22,-53.5],[-22,-50.3],[-22,-47.0],[-22,-43.8],[-22,14.6],[-22,17.8],[-22,21.1],[-22,24.3],[-22,27.6],[-22,30.8],[-22,34.1],[-22,43.8],[-22,47.0],[-22,115.1],[-22,118.4],[-22,121.6],[-22,124.9],[-22,128.1],[-22,131.4],[-22,134.6],[-22,137.8],[-22,141.1],[-22,144.3],[-22,147.6],[-19,-68.5],[-19,-65.3],[-19,-62.1],[-19,-58.9],[-19,-55.8],[-19,-52.6],[-19,-49.4],[-19,-46.2],[-19,-43.0],[-19,-39.8],[-19,14.3],[-19,17.5],[-19,20.7],[-19,23.9],[-19,27.1],[-19,30.3],[-19,33.5],[-19,46.2],[-19,122.7],[-19,125.8],[-19,129.0],[-19,132.2],[-19,135.4],[-19,138.6],[-19,141.8],[-19,145.0],[-16,-73.6],[-16,-70.4],[-16,-67.3],[-16,-64.2],[-16,-61.0],[-16,-57.9],[-16,-54.8],[-16,-51.7],[-16,-48.5],[-16,-45.4],[-16,-42.3],[-16,-39.1],[-16,14.1],[-16,17.2],[-16,20.3],[-16,23.5],[-16,26.6],[-16,29.7],[-16,32.9],[-16,36.0],[-16,39.1],[-16,48.5],[-16,126.8],[-16,129.9],[-16,133.0],[-16,136.2],[-16,142.4],[-13,-74.5],[-13,-71.4],[-13,-68.3],[-13,-65.2],[-13,-62.1],[-13,-59.0],[-13,-55.9],[-13,-52.8],[-13,-49.7],[-13,-46.6],[-13,-43.4],[-13,-40.3],[-13,15.5],[-13,18.6],[-13,21.7],[-13,24.8],[-13,27.9],[-13,31.0],[-13,34.1],[-13,37.2],[-13,40.3],[-13,49.7],[-13,130.3],[-13,133.4],[-13,136.6],[-13,142.8],[-10,-76.3],[-10,-73.2],[-10,-70.2],[-10,-67.1],[-10,-64.1],[-10,-61.0],[-10,-58.0],[-10,-54.9],[-10,-51.9],[-10,-48.8],[-10,-45.8],[-10,-42.7],[-10,-39.7],[-10,-36.6],[-10,15.3],[-10,18.3],[-10,21.4],[-10,24.4],[-10,27.5],[-10,30.5],[-10,33.6],[-10,36.6],[-10,39.7],[-10,149.5],[-7,-77.1],[-7,-74.1],[-7,-71.1],[-7,-68.1],[-7,-65.0],[-7,-62.0],[-7,-59.0],[-7,-56.0],[-7,-52.9],[-7,-49.9],[-7,-46.9],[-7,-43.9],[-7,-40.8],[-7,-37.8],[-7,13.6],[-7,16.6],[-7,19.7],[-7,22.7],[-7,25.7],[-7,28.7],[-7,31.8],[-7,34.8],[-7,37.8],[-7,107.4],[-7,110.4],[-7,140.7],[-7,143.7],[-7,146.7],[-4,-80.2],[-4,-77.1],[-4,-74.1],[-4,-71.1],[-4,-68.1],[-4,-65.0],[-4,-62.0],[-4,-59.0],[-4,-56.0],[-4,-52.9],[-4,-49.9],[-4,-46.9],[-4,-43.9],[-4,-40.8],[-4,13.6],[-4,16.6],[-4,19.7],[-4,22.7],[-4,25.7],[-4,28.7],[-4,31.8],[-4,34.8],[-4,37.8],[-4,104.4],[-4,122.5],[-4,134.6],[-4,137.6],[-4,140.7],[-4,143.7],[-4,152.8],[-1,-80.2],[-1,-77.1],[-1,-74.1],[-1,-71.1],[-1,-68.1],[-1,-65.0],[-1,-62.0],[-1,-59.0],[-1,-56.0],[-1,-52.9],[-1,-49.9],[-1,-46.9],[-1,10.6],[-1,13.6],[-1,16.6],[-1,19.7],[-1,22.7],[-1,25.7],[-1,28.7],[-1,31.8],[-1,34.8],[-1,37.8],[-1,40.8],[-1,101.3],[-1,110.4],[-1,113.4],[-1,116.5],[-1,119.5],[-1,122.5],[-1,131.6],[2,-77.1],[2,-74.1],[2,-71.1],[2,-68.1],[2,-65.0],[2,-62.0],[2,-59.0],[2,-56.0],[2,-52.9],[2,10.6],[2,13.6],[2,16.6],[2,19.7],[2,22.7],[2,25.7],[2,28.7],[2,31.8],[2,34.8],[2,37.8],[2,40.8],[2,43.9],[2,101.3],[2,113.4],[2,116.5],[5,-77.1],[5,-74.1],[5,-71.1],[5,-68.1],[5,-65.0],[5,-62.0],[5,-59.0],[5,-56.0],[5,-52.9],[5,-7.6],[5,-1.5],[5,7.6],[5,10.6],[5,13.6],[5,16.6],[5,19.7],[5,22.7],[5,25.7],[5,28.7],[5,31.8],[5,34.8],[5,37.8],[5,40.8],[5,43.9],[5,46.9],[5,101.3],[5,116.5],[8,-76.3],[8,-73.2],[8,-70.2],[8,-67.1],[8,-64.1],[8,-61.0],[8,-12.2],[8,-9.2],[8,-6.1],[8,-3.1],[8,0.0],[8,3.1],[8,6.1],[8,9.2],[8,12.2],[8,15.3],[8,18.3],[8,21.4],[8,24.4],[8,27.5],[8,30.5],[8,33.6],[8,36.6],[8,39.7],[8,42.7],[8,45.8],[8,48.8],[8,125.1],[11,-84.6],[11,-72.3],[11,-69.2],[11,-13.8],[11,-10.8],[11,-7.7],[11,-4.6],[11,-1.5],[11,1.5],[11,4.6],[11,7.7],[11,10.8],[11,13.8],[11,16.9],[11,20.0],[11,23.1],[11,26.2],[11,29.2],[11,32.3],[11,35.4],[11,38.5],[11,41.5],[11,47.7],[11,50.8],[11,78.5],[11,106.2],[11,124.6],[14,-90.0],[14,-86.9],[14,-83.8],[14,-15.5],[14,-12.4],[14,-9.3],[14,-6.2],[14,-3.1],[14,0.0],[14,3.1],[14,6.2],[14,9.3],[14,12.4],[14,15.5],[14,18.6],[14,21.7],[14,24.8],[14,27.9],[14,31.0],[14,34.1],[14,37.2],[14,40.3],[14,43.4],[14,46.6],[14,77.6],[14,99.3],[14,102.4],[14,105.5],[14,108.6],[14,121.0],[17,-97.9],[17,-94.7],[17,-91.6],[17,-88.4],[17,-15.8],[17,-12.6],[17,-9.5],[17,-6.3],[17,-3.2],[17,0.0],[17,3.2],[17,6.3],[17,9.5],[17,12.6],[17,15.8],[17,18.9],[17,22.1],[17,25.3],[17,28.4],[17,31.6],[17,34.7],[17,37.9],[17,44.2],[17,47.4],[17,50.5],[17,53.7],[17,75.8],[17,78.9],[17,82.1],[17,94.7],[17,97.9],[17,101.1],[17,104.2],[20,-102.9],[20,-99.6],[20,-90.0],[20,-77.1],[20,-16.1],[20,-12.9],[20,-9.6],[20,-6.4],[20,-3.2],[20,0.0],[20,3.2],[20,6.4],[20,9.6],[20,12.9],[20,16.1],[20,19.3],[20,22.5],[20,25.7],[20,28.9],[20,32.1],[20,35.4],[20,41.8],[20,45.0],[20,48.2],[20,51.4],[20,54.6],[20,73.9],[20,77.1],[20,80.4],[20,83.6],[20,93.2],[20,96.4],[20,99.6],[20,102.9],[20,106.1],[23,-104.7],[23,-101.5],[23,-98.2],[23,-81.8],[23,-13.1],[23,-9.8],[23,-6.5],[23,-3.3],[23,0.0],[23,3.3],[23,6.5],[23,9.8],[23,13.1],[23,16.4],[23,19.6],[23,22.9],[23,26.2],[23,29.5],[23,32.7],[23,39.3],[23,42.5],[23,45.8],[23,49.1],[23,52.4],[23,55.6],[23,58.9],[23,72.0],[23,75.3],[23,78.5],[23,81.8],[23,85.1],[23,88.4],[23,91.6],[23,94.9],[23,98.2],[23,101.5],[23,104.7],[23,108.0],[23,111.3],[23,114.5],[23,121.1],[26,-109.3],[26,-106.0],[26,-102.6],[26,-99.3],[26,-11.8],[26,-8.4],[26,-5.0],[26,-1.7],[26,1.7],[26,5.0],[26,8.4],[26,11.8],[26,15.1],[26,18.5],[26,21.9],[26,25.2],[26,28.6],[26,32.0],[26,38.7],[26,42.1],[26,45.4],[26,48.8],[26,58.9],[26,62.2],[26,65.6],[26,69.0],[26,72.3],[26,75.7],[26,79.1],[26,82.4],[26,85.8],[26,89.2],[26,92.5],[26,95.9],[26,99.3],[26,102.6],[26,106.0],[26,109.3],[26,112.7],[26,116.1],[26,119.4],[29,-114.2],[29,-110.8],[29,-107.3],[29,-103.8],[29,-100.4],[29,-96.9],[29,-10.4],[29,-6.9],[29,-3.5],[29,0.0],[29,3.5],[29,6.9],[29,10.4],[29,13.8],[29,17.3],[29,20.8],[29,24.2],[29,27.7],[29,31.2],[29,38.1],[29,41.5],[29,45.0],[29,51.9],[29,55.4],[29,58.8],[29,62.3],[29,65.8],[29,69.2],[29,72.7],[29,76.2],[29,79.6],[29,83.1],[29,86.5],[29,90.0],[29,93.5],[29,96.9],[29,100.4],[29,103.8],[29,107.3],[29,110.8],[29,114.2],[29,117.7],[29,121.2],[32,-115.8],[32,-112.3],[32,-108.7],[32,-105.1],[32,-101.6],[32,-98.0],[32,-94.5],[32,-90.9],[32,-87.3],[32,-83.8],[32,-8.9],[32,-5.3],[32,-1.8],[32,1.8],[32,5.3],[32,8.9],[32,12.5],[32,23.2],[32,37.4],[32,41.0],[32,44.6],[32,48.1],[32,51.7],[32,55.2],[32,58.8],[32,62.4],[32,65.9],[32,69.5],[32,73.1],[32,76.6],[32,80.2],[32,83.8],[32,87.3],[32,90.9],[32,94.5],[32,98.0],[32,101.6],[32,105.1],[32,108.7],[32,112.3],[32,115.8],[32,119.4],[35,-117.6],[35,-113.9],[35,-110.2],[35,-106.5],[35,-102.9],[35,-99.2],[35,-95.5],[35,-91.8],[35,-88.2],[35,-84.5],[35,-80.8],[35,-77.1],[35,-3.7],[35,0.0],[35,3.7],[35,7.3],[35,25.7],[35,33.1],[35,36.7],[35,40.4],[35,44.1],[35,47.8],[35,51.4],[35,55.1],[35,58.8],[35,62.4],[35,66.1],[35,69.8],[35,73.5],[35,77.1],[35,80.8],[35,84.5],[35,88.2],[35,91.8],[35,95.5],[35,99.2],[35,102.9],[35,106.5],[35,110.2],[35,113.9],[35,117.6],[35,128.6],[35,132.2],[35,135.9],[35,139.6],[38,-122.6],[38,-118.7],[38,-114.9],[38,-111.1],[38,-107.2],[38,-103.4],[38,-99.6],[38,-95.7],[38,-91.9],[38,-88.1],[38,-84.3],[38,-80.4],[38,-76.6],[38,-7.7],[38,-3.8],[38,15.3],[38,23.0],[38,26.8],[38,30.6],[38,34.5],[38,38.3],[38,42.1],[38,46.0],[38,49.8],[38,53.6],[38,57.4],[38,61.3],[38,65.1],[38,68.9],[38,72.8],[38,76.6],[38,80.4],[38,84.3],[38,88.1],[38,91.9],[38,95.7],[38,99.6],[38,103.4],[38,107.2],[38,111.1],[38,114.9],[38,126.4],[41,-124.0],[41,-120.0],[41,-116.0],[41,-112.0],[41,-108.0],[41,-104.0],[41,-100.0],[41,-96.0],[41,-92.0],[41,-88.0],[41,-84.0],[41,-80.0],[41,-76.0],[41,-8.0],[41,-4.0],[41,0.0],[41,16.0],[41,20.0],[41,24.0],[41,32.0],[41,36.0],[41,40.0],[41,44.0],[41,48.0],[41,52.0],[41,56.0],[41,60.0],[41,64.0],[41,68.0],[41,72.0],[41,76.0],[41,80.0],[41,84.0],[41,88.0],[41,92.0],[41,96.0],[41,100.0],[41,104.0],[41,108.0],[41,112.0],[41,116.0],[41,120.0],[41,124.0],[41,128.0],[44,-121.4],[44,-117.2],[44,-113.0],[44,-108.8],[44,-104.7],[44,-100.5],[44,-96.3],[44,-92.1],[44,-87.9],[44,-83.7],[44,-79.5],[44,-75.3],[44,-71.2],[44,0.0],[44,4.2],[44,12.6],[44,16.7],[44,20.9],[44,25.1],[44,41.9],[44,46.0],[44,50.2],[44,54.4],[44,58.6],[44,62.8],[44,67.0],[44,71.2],[44,75.3],[44,79.5],[44,83.7],[44,87.9],[44,92.1],[44,96.3],[44,100.5],[44,104.7],[44,108.8],[44,113.0],[44,117.2],[44,121.4],[44,125.6],[44,129.8],[44,134.0],[44,142.3],[47,-122.2],[47,-117.8],[47,-113.3],[47,-108.9],[47,-104.4],[47,-100.0],[47,-95.6],[47,-91.1],[47,-86.7],[47,-82.2],[47,-77.8],[47,-73.3],[47,-68.9],[47,-55.6],[47,2.2],[47,6.7],[47,11.1],[47,15.6],[47,20.0],[47,24.4],[47,28.9],[47,33.3],[47,42.2],[47,46.7],[47,51.1],[47,55.6],[47,60.0],[47,64.4],[47,68.9],[47,73.3],[47,77.8],[47,82.2],[47,86.7],[47,91.1],[47,95.6],[47,100.0],[47,104.4],[47,108.9],[47,113.3],[47,117.8],[47,122.2],[47,126.7],[47,131.1],[47,135.6],[50,-123.9],[50,-119.2],[50,-114.5],[50,-109.9],[50,-105.2],[50,-100.5],[50,-95.8],[50,-91.2],[50,-86.5],[50,-81.8],[50,-77.1],[50,-72.5],[50,-67.8],[50,2.3],[50,7.0],[50,11.7],[50,16.4],[50,21.0],[50,25.7],[50,30.4],[50,35.1],[50,39.7],[50,44.4],[50,49.1],[50,53.8],[50,58.4],[50,63.1],[50,67.8],[50,72.5],[50,77.1],[50,81.8],[50,86.5],[50,91.2],[50,95.8],[50,100.5],[50,105.2],[50,109.9],[50,114.5],[50,119.2],[50,123.9],[50,128.6],[50,133.2],[50,137.9],[50,142.6],[53,-125.0],[53,-120.0],[53,-115.0],[53,-110.0],[53,-105.0],[53,-100.0],[53,-95.0],[53,-90.0],[53,-85.0],[53,-75.0],[53,-70.0],[53,-65.0],[53,-60.0],[53,0.0],[53,5.0],[53,10.0],[53,15.0],[53,20.0],[53,25.0],[53,30.0],[53,35.0],[53,40.0],[53,45.0],[53,50.0],[53,55.0],[53,60.0],[53,65.0],[53,70.0],[53,75.0],[53,80.0],[53,85.0],[53,90.0],[53,95.0],[53,100.0],[53,105.0],[53,110.0],[53,115.0],[53,120.0],[53,125.0],[53,130.0],[53,135.0],[53,140.0],[56,-158.5],[56,-131.6],[56,-126.3],[56,-120.9],[56,-115.5],[56,-110.1],[56,-104.8],[56,-99.4],[56,-94.0],[56,-88.7],[56,-72.5],[56,-67.2],[56,-61.8],[56,13.4],[56,24.2],[56,29.6],[56,34.9],[56,40.3],[56,45.7],[56,51.0],[56,56.4],[56,61.8],[56,67.2],[56,72.5],[56,77.9],[56,83.3],[56,88.7],[56,94.0],[56,99.4],[56,104.8],[56,110.1],[56,115.5],[56,120.9],[56,126.3],[56,131.6],[56,137.0],[56,158.5],[59,-156.4],[59,-138.7],[59,-132.8],[59,-126.9],[59,-121.0],[59,-115.1],[59,-109.2],[59,-103.3],[59,-97.4],[59,-73.8],[59,8.9],[59,14.8],[59,26.6],[59,32.5],[59,38.4],[59,44.3],[59,50.2],[59,56.1],[59,62.0],[59,67.9],[59,73.8],[59,79.7],[59,85.6],[59,91.5],[59,97.4],[59,103.3],[59,109.2],[59,115.1],[59,121.0],[59,126.9],[59,132.8],[59,138.7],[59,162.3],[62,-160.7],[62,-154.3],[62,-147.9],[62,-141.4],[62,-135.0],[62,-128.6],[62,-122.1],[62,-115.7],[62,-109.3],[62,-102.9],[62,-96.4],[62,-77.1],[62,-45.0],[62,6.4],[62,12.9],[62,25.7],[62,32.1],[62,38.6],[62,45.0],[62,51.4],[62,57.9],[62,64.3],[62,70.7],[62,77.1],[62,83.6],[62,90.0],[62,96.4],[62,102.9],[62,109.3],[62,115.7],[62,122.1],[62,128.6],[62,135.0],[62,141.4],[62,147.9],[62,154.3],[62,160.7],[62,167.1],[62,173.6],[65,-172.8],[65,-165.6],[65,-158.4],[65,-151.2],[65,-144.0],[65,-136.8],[65,-129.6],[65,-122.4],[65,-115.2],[65,-108.0],[65,-100.8],[65,-93.6],[65,-72.0],[65,-50.4],[65,-43.2],[65,-21.6],[65,-14.4],[65,14.4],[65,28.8],[65,43.2],[65,50.4],[65,57.6],[65,64.8],[65,72.0],[65,79.2],[65,86.4],[65,93.6],[65,100.8],[65,108.0],[65,115.2],[65,122.4],[65,129.6],[65,136.8],[65,144.0],[65,151.2],[65,158.4],[65,165.6],[65,172.8],[68,-163.6],[68,-155.5],[68,-147.3],[68,-139.1],[68,-130.9],[68,-122.7],[68,-106.4],[68,-98.2],[68,-90.0],[68,-81.8],[68,-49.1],[68,-40.9],[68,-32.7],[68,16.4],[68,24.5],[68,32.7],[68,57.3],[68,65.5],[68,81.8],[68,90.0],[68,98.2],[68,106.4],[68,114.5],[68,122.7],[68,130.9],[68,139.1],[68,147.3],[68,155.5],[68,163.6],[68,171.8],[71,-115.4],[71,-106.2],[71,-87.7],[71,-78.5],[71,-50.8],[71,-41.5],[71,-32.3],[71,-23.1],[71,69.2],[71,78.5],[71,87.7],[71,96.9],[71,106.2],[71,115.4],[71,124.6],[71,133.8],[71,143.1],[71,152.3],[74,-92.7],[74,-49.1],[74,-38.2],[74,-27.3],[74,92.7],[74,103.6],[77,-83.1],[77,-69.2],[77,-55.4],[77,-41.5],[77,-27.7]];

  // Real Audited Target Nodes with Official Proof Records
  const PROOF_TARGETS = [
    {
      name: 'Flowise Node',
      cve: 'CVE-2026-73484',
      cvss: 'CVSS 8.6',
      vuln: 'Python Sandbox Escape',
      lat: 37.7,
      lon: -122.4,
      color: '#10b981'
    },
    {
      name: 'AutoGPT Cluster',
      cve: 'CVE-2026-22038',
      cvss: 'CVSS 8.1',
      vuln: 'Plaintext API Secret Logging',
      lat: 40.7,
      lon: -74.0,
      color: '#0284c7'
    },
    {
      name: 'Qdrant DB Core',
      cve: 'CVSS 9.1',
      cvss: 'CVSS 9.1',
      vuln: 'Vector DB Vulnerability (Bountied)',
      lat: 52.5,
      lon: 13.4,
      color: '#10b981'
    },
    {
      name: 'DigiDoc4 Client',
      cve: 'CVE-2026-70383',
      cvss: 'CWE-22',
      vuln: 'Arbitrary File Overwrite / Traversal',
      lat: 59.4,
      lon: 24.7,
      color: '#0284c7'
    },
    {
      name: 'Trilium Notes',
      cve: 'CVE-2025-68621',
      cvss: 'CWE-208',
      vuln: 'Timing Attack HMAC Recovery',
      lat: 50.1,
      lon: 14.4,
      color: '#10b981'
    },
    {
      name: 'Gym-Management',
      cve: 'CVE-2025-67146',
      cvss: 'SQLi',
      vuln: 'SQL Injection / Auth Bypass',
      lat: 28.6,
      lon: 77.2,
      color: '#0284c7'
    },
    {
      name: 'ASL Defense Command',
      cve: 'VERIFIED LAB',
      cvss: 'ZERO-DAY',
      vuln: 'Manual Source Code Auditing Hub',
      lat: 17.4,
      lon: 78.5,
      color: '#2563eb'
    }
  ];

  // Threat Origin Nodes (Simulating real-world cyber threat vectors)
  const THREAT_ORIGINS = [
    { name: 'Adversarial Botnet Alpha', lat: 55.7, lon: 37.6 },
    { name: 'Exploit Cluster Bravo', lat: 39.9, lon: 116.4 },
    { name: 'Darknet Relay Delta', lat: -23.5, lon: -46.6 },
    { name: 'Automated Red-Team Rig', lat: 51.5, lon: -0.1 },
    { name: 'Hostile AI Probe Array', lat: 1.3, lon: 103.8 },
    { name: 'Remote Attack Proxy Zeta', lat: 35.7, lon: 139.7 }
  ];

  let canvas, ctx;
  let animId = null;
  let isVisible = true;
  let width = 0, height = 0, dpr = 1;
  let globeRadius = 260;
  let centerX = 0, centerY = 0;

  // Real-time rotation & tilt
  let rotationAngle = 1.2;
  const ROTATION_SPEED = 0.0016;
  let cloudAngle = 1.2;
  const CLOUD_SPEED = 0.0022; // Clouds drift slightly faster than Earth

  const AXIAL_TILT = 23.4 * (Math.PI / 180);
  let mouseTiltX = 0, mouseTiltY = 0;
  let targetTiltX = 0, targetTiltY = 0;
  let isDragging = false, lastDragX = 0, lastDragY = 0;

  // Live Attack Missile Streams & Proof Explosions
  const liveAttacks = [];
  const impactRings = [];
  const activeProofTags = [];
  let attackSpawnTimer = 0;
  let attackCounter = 148294;

  // Realistic Drifting Cloud Clusters
  const CLOUD_CLUSTERS = [];
  for (let c = 0; c < 35; c++) {
    CLOUD_CLUSTERS.push({
      lat: (Math.random() * 140) - 70,
      lon: (Math.random() * 360) - 180,
      size: Math.random() * 18 + 10,
      alpha: Math.random() * 0.45 + 0.25
    });
  }

  function init() {
    canvas = document.getElementById('earthCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        if (isDragging) return;
        const rect = heroSection.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        targetTiltX = ny * 0.22;
        targetTiltY = nx * 0.35;
      }, { passive: true });

      heroSection.addEventListener('mouseleave', () => {
        targetTiltX = 0;
        targetTiltY = 0;
      }, { passive: true });

      // Mouse drag rotation
      canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastDragX = e.clientX;
        lastDragY = e.clientY;
      });
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastDragX;
        const dy = e.clientY - lastDragY;
        rotationAngle += dx * 0.005;
        mouseTiltX += dy * 0.003;
        lastDragX = e.clientX;
        lastDragY = e.clientY;
      });
      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }

    // Intersection observer
    if ('IntersectionObserver' in window && heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            animId = requestAnimationFrame(render);
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

    // Spawn initial attacks
    spawnLiveAttack();
    spawnLiveAttack();

    animId = requestAnimationFrame(render);
  }

  function handleResize() {
    if (!canvas) return;
    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : window.innerWidth;
    const h = parent ? parent.clientHeight : window.innerHeight;

    width = w;
    height = h;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    centerX = width / 2;
    centerY = height / 2;
    globeRadius = Math.min(width, height) * 0.38;
    globeRadius = Math.max(130, Math.min(320, globeRadius));
  }

  function spawnLiveAttack() {
    const originIdx = Math.floor(Math.random() * THREAT_ORIGINS.length);
    const targetIdx = Math.floor(Math.random() * PROOF_TARGETS.length);

    const origin = THREAT_ORIGINS[originIdx];
    const target = PROOF_TARGETS[targetIdx];

    const colors = ['#dc2626', '#ef4444', '#ea580c', '#e11d48'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    liveAttacks.push({
      origin: origin,
      target: target,
      progress: 0,
      speed: 0.007 + Math.random() * 0.006,
      arcHeight: 1.25 + Math.random() * 0.25,
      color: color,
      trail: []
    });
  }

  // 3D Spherical Projection with Dual Axial Rotation & Perspective
  function project3D(lat, lon, r, rotY, tiltX, tiltY) {
    const phi = (lat * Math.PI) / 180;
    const theta = ((lon + rotY * (180 / Math.PI)) * Math.PI) / 180;

    let x = r * Math.cos(phi) * Math.sin(theta);
    let y = -r * Math.sin(phi);
    let z = r * Math.cos(phi) * Math.cos(theta);

    const totalTiltX = AXIAL_TILT + tiltX;
    const cosX = Math.cos(totalTiltX);
    const sinX = Math.sin(totalTiltX);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    const cosY = Math.cos(tiltY);
    const sinY = Math.sin(tiltY);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;

    const fov = 950;
    const scale = fov / (fov - z2);
    const px = centerX + x2 * scale;
    const py = centerY + y1 * scale;

    return { x: px, y: py, z: z2, scale: scale };
  }

  function render() {
    if (!isVisible) {
      animId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    if (!isDragging) {
      mouseTiltX += (targetTiltX - mouseTiltX) * 0.05;
      mouseTiltY += (targetTiltY - mouseTiltY) * 0.05;
      rotationAngle += ROTATION_SPEED;
      cloudAngle += CLOUD_SPEED;
    }

    // Spawn live attack stream
    attackSpawnTimer++;
    if (attackSpawnTimer > 70) {
      attackSpawnTimer = 0;
      if (liveAttacks.length < 5) {
        spawnLiveAttack();
      }
    }

    // ── 1. ATMOSPHERIC OUTER CORONA GLOW ──
    drawAtmosphereCorona();

    // ── 2. REALISTIC BLUE MARBLE OCEAN SPHERE ──
    drawRealisticOceanSphere();

    // ── 3. REAL NATURAL EARTH CONTINENTS (EMERALD & TERRAIN) ──
    drawContinents();

    // ── 4. REALISTIC DRIFTING CLOUDS (ATMOSPHERE) ──
    drawDriftingClouds();

    // ── 5. REAL AUDITED TARGET NODES (FLOWISE, AUTOGPT, QDRANT, DIGIDOC4) ──
    drawTargetNodes();

    // ── 6. REAL-TIME LIVE ATTACK MISSILES & LASER ARCS ──
    drawLiveAttackMissiles();

    // ── 7. DEFENSIVE SHIELD BURSTS & EXPLOSIONS ──
    drawDefensiveShields();

    // ── 8. FLOATING LIVE PROOF BADGES ──
    drawProofBadges();

    animId = requestAnimationFrame(render);
  }

  // 1. Atmospheric Outer Corona Glow
  function drawAtmosphereCorona() {
    const grad = ctx.createRadialGradient(
      centerX, centerY, globeRadius * 0.85,
      centerX, centerY, globeRadius * 1.45
    );
    grad.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
    grad.addColorStop(0.3, 'rgba(14, 165, 233, 0.12)');
    grad.addColorStop(0.65, 'rgba(59, 130, 246, 0.04)');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, globeRadius * 1.45, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Realistic Blue Marble Ocean Sphere Body
  function drawRealisticOceanSphere() {
    const oceanGrad = ctx.createRadialGradient(
      centerX - globeRadius * 0.35, centerY - globeRadius * 0.35, globeRadius * 0.1,
      centerX, centerY, globeRadius
    );
    // Real Earth Oceanic Gradient
    oceanGrad.addColorStop(0, '#3b82f6');    // Sunlit Azure Surface Waters
    oceanGrad.addColorStop(0.35, '#2563eb'); // Deep Royal Ocean
    oceanGrad.addColorStop(0.72, '#1d4ed8'); // Abyssal Oceanic Trench
    oceanGrad.addColorStop(0.92, '#1e3a8a'); // Twilight Edge Depth
    oceanGrad.addColorStop(1, '#0f172a');    // Space Horizon Limb

    ctx.fillStyle = oceanGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Atmosphere rim highlight
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // 3. Real Natural Earth Continent Landmasses
  function drawContinents() {
    const total = LAND_DOTS.length;

    for (let i = 0; i < total; i++) {
      const dot = LAND_DOTS[i];
      const pt = project3D(dot[0], dot[1], globeRadius, rotationAngle, mouseTiltX, mouseTiltY);

      // Occlude back hemisphere
      if (pt.z < 0) continue;

      const depth = Math.min(1, pt.z / globeRadius);
      const alpha = 0.55 + depth * 0.45;
      const radius = (1.9 + depth * 1.4) * pt.scale;

      // Realistic Earth land colors (Emerald green & terrain shades)
      if (depth > 0.6) {
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`; // Sunlit lush green
      } else {
        ctx.fillStyle = `rgba(5, 150, 105, ${alpha * 0.9})`; // Coastal emerald
      }

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Land core highlight for 3D texture
      if (depth > 0.75) {
        ctx.fillStyle = 'rgba(167, 243, 208, 0.55)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 4. Realistic Drifting Cloud Layer
  function drawDriftingClouds() {
    const len = CLOUD_CLUSTERS.length;
    for (let i = 0; i < len; i++) {
      const c = CLOUD_CLUSTERS[i];
      const pt = project3D(c.lat, c.lon, globeRadius * 1.018, cloudAngle, mouseTiltX, mouseTiltY);

      if (pt.z < 10) continue; // Front hemisphere only

      const depth = Math.min(1, pt.z / globeRadius);
      const alpha = c.alpha * depth * 0.75;

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, c.size * pt.scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 5. Real Audited Target Nodes
  function drawTargetNodes() {
    const len = PROOF_TARGETS.length;
    for (let i = 0; i < len; i++) {
      const node = PROOF_TARGETS[i];
      const pt = project3D(node.lat, node.lon, globeRadius, rotationAngle, mouseTiltX, mouseTiltY);

      if (pt.z < 10) continue; // Visible on front

      const depth = Math.min(1, pt.z / globeRadius);
      const alpha = 0.7 + depth * 0.3;

      // Pulse ring
      const pingR = (Date.now() * 0.025 + i * 8) % 20;
      const pingAlpha = Math.max(0, 1 - pingR / 20) * alpha * 0.7;

      ctx.strokeStyle = node.color;
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = pingAlpha;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, (4 + pingR) * pt.scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Node point core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3 * pt.scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5 * pt.scale, 0, Math.PI * 2);
      ctx.globalAlpha = 0.55;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Node Label
      if (depth > 0.35) {
        ctx.font = '500 10px JetBrains Mono, monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(node.name, pt.x + 8, pt.y + 3);

        ctx.font = '600 9px JetBrains Mono, monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(node.cve, pt.x + 8, pt.y + 14);
      }
    }
  }

  // 6. Real-Time Live Attack Missiles & Laser Arcs
  function drawLiveAttackMissiles() {
    for (let i = liveAttacks.length - 1; i >= 0; i--) {
      const atk = liveAttacks[i];
      atk.progress += atk.speed;

      const pStart = project3D(atk.origin.lat, atk.origin.lon, globeRadius, rotationAngle, mouseTiltX, mouseTiltY);
      const pEnd = project3D(atk.target.lat, atk.target.lon, globeRadius, rotationAngle, mouseTiltX, mouseTiltY);

      const midLat = (atk.origin.lat + atk.target.lat) / 2;
      const midLon = (atk.origin.lon + atk.target.lon) / 2;
      const pMid = project3D(midLat, midLon, globeRadius * atk.arcHeight, rotationAngle, mouseTiltX, mouseTiltY);

      // Only draw when visible on front
      if (pStart.z < -20 && pEnd.z < -20) continue;

      // Laser Arc Trajectory
      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);
      ctx.quadraticCurveTo(pMid.x, pMid.y, pEnd.x, pEnd.y);
      ctx.strokeStyle = `${atk.color}88`;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Missile projectile position
      const t = Math.min(1, atk.progress);
      const mx = (1 - t) * (1 - t) * pStart.x + 2 * (1 - t) * t * pMid.x + t * t * pEnd.x;
      const my = (1 - t) * (1 - t) * pStart.y + 2 * (1 - t) * t * pMid.y + t * t * pEnd.y;

      atk.trail.push({ x: mx, y: my });
      if (atk.trail.length > 8) atk.trail.shift();

      // Trailing attack sparks
      for (let k = 0; k < atk.trail.length; k++) {
        const tr = atk.trail[k];
        const trAlpha = (k / atk.trail.length) * 0.7;
        ctx.fillStyle = atk.color;
        ctx.globalAlpha = trAlpha;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, 2 * (k / atk.trail.length), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Glowing Missile Head
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(mx, my, 3.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = atk.color;
      ctx.beginPath();
      ctx.arc(mx, my, 7, 0, Math.PI * 2);
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // On impact: Trigger proof verification & defensive shield
      if (atk.progress >= 1.0) {
        triggerProofImpact(pEnd.x, pEnd.y, atk);
        liveAttacks.splice(i, 1);
      }
    }
  }

  // 7. Defensive Shield Bursts & Real Proof Impact
  function triggerProofImpact(x, y, atk) {
    impactRings.push({
      x: x,
      y: y,
      radius: 4,
      maxRadius: 30,
      alpha: 1.0,
      color: '#10b981'
    });

    // Add floating proof badge
    activeProofTags.push({
      x: x,
      y: y - 10,
      text: `PROVED: ${atk.target.cve}`,
      vuln: atk.target.vuln,
      alpha: 1.0,
      vy: -0.4
    });

    // Update attack counter
    attackCounter++;
    const countEl = document.getElementById('hudAttackCount');
    if (countEl) {
      countEl.textContent = attackCounter.toLocaleString();
    }

    // Update live HUD feed with verified proof
    const feedEl = document.getElementById('hudAttackFeed');
    if (feedEl) {
      const line = document.createElement('div');
      line.className = 'hud-feed-line';
      line.innerHTML = `<span style="color: #059669; font-weight: 600;">[LIVE PROOF]</span> <strong>${atk.target.name}</strong> · ${atk.target.vuln} <span class="badge-pill badge-verified" style="font-size: 0.6rem; padding: 0.1rem 0.4rem;">${atk.target.cve}</span>`;
      feedEl.prepend(line);
      while (feedEl.children.length > 3) {
        feedEl.removeChild(feedEl.lastChild);
      }
    }
  }

  function drawDefensiveShields() {
    for (let i = impactRings.length - 1; i >= 0; i--) {
      const imp = impactRings[i];
      imp.radius += 1.8;
      imp.alpha -= 0.05;

      if (imp.alpha <= 0) {
        impactRings.splice(i, 1);
        continue;
      }

      ctx.strokeStyle = imp.color;
      ctx.lineWidth = 2.0;
      ctx.globalAlpha = imp.alpha;
      ctx.beginPath();
      ctx.arc(imp.x, imp.y, imp.radius, 0, Math.PI * 2);
      ctx.stroke();

      if (imp.radius < 12) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(imp.x, imp.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
    }
  }

  // 8. Floating Live Proof Badges
  function drawProofBadges() {
    for (let i = activeProofTags.length - 1; i >= 0; i--) {
      const tag = activeProofTags[i];
      tag.y += tag.vy;
      tag.alpha -= 0.02;

      if (tag.alpha <= 0) {
        activeProofTags.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = tag.alpha;
      ctx.font = '600 10px JetBrains Mono, monospace';

      // Badge pill background
      const textWidth = ctx.measureText(tag.text).width;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(tag.x - textWidth / 2 - 6, tag.y - 12, textWidth + 12, 16, 4);
      ctx.fill();

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.textAlign = 'center';
      ctx.fillText(tag.text, tag.x, tag.y);
      ctx.restore();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
